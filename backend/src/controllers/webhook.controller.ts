import type { Request, Response } from "express";
import { verifyMercadoPagoSignature } from "../services/verifySignature";
import { getPayment } from "../services/mercadopago";
import { connectMongo } from "../db/mongo";
import { Order } from "../models/Order";

export async function mercadoPagoWebhookController(req: Request, res: Response) {
  try {
    verifyMercadoPagoSignature(req);

    const body = req.body;
    const { type, data } = body || {};

    if (type !== "payment") {
      return res.status(200).json({ received: true, ignored: true });
    }

    const paymentId = String(data?.id || "");
    if (!paymentId) {
      return res.status(400).json({ error: "payment id ausente" });
    }

    const paymentData: any = await getPayment(paymentId);

    const orderId =
      paymentData?.external_reference ||
      paymentData?.metadata?.order_id ||
      paymentData?.metadata?.orderId;

    if (!orderId) {
      return res.status(200).json({ received: true, warning: "no orderId" });
    }

    const approved =
      paymentData?.status === "approved" || paymentData?.date_approved;

    await connectMongo();

    if (approved) {
      await Order.findByIdAndUpdate(orderId, {
        $set: {
          "payment.paymentId": String(paymentId),
          "payment.status": "paid",
          "payment.paidAt": new Date(),
        },
      });
    } else {
      await Order.findByIdAndUpdate(orderId, {
        $set: {
          "payment.paymentId": String(paymentId),
          "payment.status": paymentData?.status || "pending_payment",
        },
      });
    }

    return res.status(200).json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error?.message || error);
    return res.status(500).json({ error: "Webhook handler failed" });
  }
}
