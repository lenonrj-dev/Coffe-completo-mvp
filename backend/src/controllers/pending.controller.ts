import type { Request, Response } from "express";
import { getPayment } from "../services/mercadopago";
import { connectMongo } from "../db/mongo";
import { Order } from "../models/Order";
import { env } from "../config/env";

export async function pendingController(req: Request, res: Response) {
  try {
    const paymentId = String(req.query.payment_id || "");
    const orderId = String(req.query.external_reference || "");

    if (!paymentId || !orderId) {
      return res.redirect(`${env.FRONTEND_URL}/?status=pendente`);
    }

    const paymentData: any = await getPayment(paymentId);

    const approved =
      paymentData?.status === "approved" || paymentData?.date_approved;

    await connectMongo();

    if (approved) {
      await Order.findByIdAndUpdate(orderId, {
        $set: {
          "payment.paymentId": paymentId,
          "payment.status": "paid",
          "payment.paidAt": new Date(),
        },
      });

      return res.redirect(`${env.FRONTEND_URL}/?status=sucesso&order_id=${orderId}`);
    }

    return res.redirect(`${env.FRONTEND_URL}/?status=pendente&order_id=${orderId}`);
  } catch (err) {
    console.error(err);
    return res.redirect(`${env.FRONTEND_URL}/?status=falha`);
  }
}
