import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { env } from "../config/env";

export const mpClient = new MercadoPagoConfig({
  accessToken: env.MERCADO_PAGO_ACCESS_TOKEN,
});

export async function createPreference(body: any) {
  const preference = new Preference(mpClient);
  const created = await preference.create({ body });
  return created;
}

export async function getPayment(paymentId: string) {
  const payment = new Payment(mpClient);
  const paymentData = await payment.get({ id: paymentId });
  return paymentData;
}
