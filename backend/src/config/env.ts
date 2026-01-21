import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number().optional(),
  MONGO_URI: z.string().min(10),

  MERCADO_PAGO_ACCESS_TOKEN: z.string().min(10),
  MERCADO_PAGO_WEBHOOK_SECRET: z.string().min(5),

  FRONTEND_URL: z.string().url(),
  ADMIN_URL: z.string().url().optional(),

  BACKEND_URL: z.string().url().optional(),

  ADMIN_API_KEY: z.string().min(5).optional(),
});

export const env = EnvSchema.parse({
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,

  MERCADO_PAGO_ACCESS_TOKEN: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  MERCADO_PAGO_WEBHOOK_SECRET: process.env.MERCADO_PAGO_WEBHOOK_SECRET,

  FRONTEND_URL: process.env.FRONTEND_URL,
  ADMIN_URL: process.env.ADMIN_URL,

  BACKEND_URL: process.env.BACKEND_URL,

  ADMIN_API_KEY: process.env.ADMIN_API_KEY,
});
