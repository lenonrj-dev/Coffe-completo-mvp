import type { Request, Response } from "express";
import { z } from "zod";
import { connectMongo } from "../db/mongo";
import { Order } from "../models/Order";
import { createPreference } from "../services/mercadopago";
import { env } from "../config/env";
import { getProductById } from "../data/prodcts";

const CheckoutSchema = z.object({
  customer: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().min(8),
  }),
  fulfillment: z.object({
    type: z.enum(["pickup", "delivery"]),
    addressLabel: z.string().min(2),
    addressLine: z.string().min(4),
  }),
  schedule: z
    .object({
      date: z.string().optional(),
      timeWindow: z.string().optional(),
    })
    .optional(),
  coupon: z
    .object({
      code: z.string().optional(),
      discount: z.number().optional(),
    })
    .optional(),
  items: z
    .array(
      z.object({
        productId: z.string().min(2),
        quantity: z.number().int().min(1).max(99),
      })
    )
    .min(1),
});

export async function getCatalog(_req: Request, res: Response) {
  return res.status(200).json({ ok: true });
}

export async function createCheckoutController(req: Request, res: Response) {
  const parsed = CheckoutSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Payload inválido",
      issues: parsed.error.flatten(),
    });
  }

  const payload = parsed.data;

  await connectMongo();

  // monta itens com base no catálogo
  const itemsDetailed = payload.items.map((i) => {
    const p = getProductById(i.productId);
    if (!p) {
      throw new Error(`Produto não encontrado: ${i.productId}`);
    }
    return {
      productId: p.id,
      title: p.title,
      unitPrice: p.unit_price,
      quantity: i.quantity,
      image: p.image,
    };
  });

  const subtotal = itemsDetailed.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  const discount = payload.coupon?.discount ? Number(payload.coupon.discount) : 0;
  const total = Math.max(subtotal - discount, 0);

  // cria pedido no Mongo (status: pending)
  const order = await Order.create({
    items: itemsDetailed,
    customer: payload.customer,
    fulfillment: payload.fulfillment,
    schedule: payload.schedule,
    coupon: payload.coupon,
    totals: {
      subtotal,
      discount,
      total,
      currency_id: "BRL",
    },
    payment: {
      provider: "mercadopago",
      status: "pending_payment",
    },
    orderStatus: "received",
  });

  // cria preference (Checkout Pro)
  const preferenceBody: any = {
    external_reference: String(order._id),
    metadata: {
      order_id: String(order._id),
      customer_email: payload.customer.email || "",
      customer_phone: payload.customer.phone,
    },
    items: itemsDetailed.map((item) => ({
      id: item.productId,
      title: item.title,
      description: "CoffeeCafe Pedido",
      quantity: item.quantity,
      unit_price: item.unitPrice,
      currency_id: "BRL",
      category_id: "coffee",
    })),
    payment_methods: {
      installments: 12,
    },
    auto_return: "approved",
    back_urls: {
      success: `${env.FRONTEND_URL}/?status=sucesso&order_id=${order._id}`,
      failure: `${env.FRONTEND_URL}/?status=falha&order_id=${order._id}`,
      pending: `${env.FRONTEND_URL}/?status=pendente&order_id=${order._id}`,
    },
  };

  if (env.BACKEND_URL) {
    preferenceBody.notification_url = `${env.BACKEND_URL}/api/webhook/mercadopago`;
  }

  if (payload.customer.email) {
    preferenceBody.payer = { email: payload.customer.email };
  }

  const createdPreference = await createPreference(preferenceBody);

  const preferenceId = createdPreference.id;
  const initPoint = createdPreference.init_point;

  if (!preferenceId || !initPoint) {
    return res.status(500).json({ error: "Falha ao criar preference" });
  }

  // salva no pedido
  order.payment.preferenceId = preferenceId;
  order.payment.initPoint = initPoint;
  await order.save();

  return res.status(200).json({
    orderId: String(order._id),
    preferenceId,
    initPoint,
  });
}
