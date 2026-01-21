import type { Request, Response } from "express";
import { connectMongo } from "../db/mongo";
import { Order } from "../models/Order";
import { env } from "../config/env";

export async function listOrdersController(req: Request, res: Response) {
  await connectMongo();

  const email = req.query.email ? String(req.query.email) : undefined;
  const phone = req.query.phone ? String(req.query.phone) : undefined;

  const where: any = {};
  if (email) where["customer.email"] = email;
  if (phone) where["customer.phone"] = phone;

  const orders = await Order.find(where).sort({ createdAt: -1 }).limit(100);
  return res.status(200).json({ orders });
}

export async function getOrderController(req: Request, res: Response) {
  await connectMongo();

  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ error: "Pedido não encontrado" });
  }

  return res.status(200).json({ order });
}

export async function adminListOrdersController(req: Request, res: Response) {
  const key = req.headers["x-admin-key"] ? String(req.headers["x-admin-key"]) : "";

  if (env.ADMIN_API_KEY && key !== env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  await connectMongo();

  const orders = await Order.find({}).sort({ createdAt: -1 }).limit(200);
  return res.status(200).json({ orders });
}

export async function adminUpdateOrderStatusController(req: Request, res: Response) {
  const key = req.headers["x-admin-key"] ? String(req.headers["x-admin-key"]) : "";

  if (env.ADMIN_API_KEY && key !== env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  await connectMongo();

  const { id } = req.params;
  const { orderStatus } = req.body as { orderStatus?: string };

  if (!orderStatus) {
    return res.status(400).json({ error: "orderStatus é obrigatório" });
  }

  const updated = await Order.findByIdAndUpdate(
    id,
    { $set: { orderStatus } },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ error: "Pedido não encontrado" });
  }

  return res.status(200).json({ order: updated });
}
