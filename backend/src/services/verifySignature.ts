import crypto from "crypto";
import type { Request } from "express";
import { env } from "../config/env";

export function verifyMercadoPagoSignature(req: Request) {
  const xSignature = req.headers["x-signature"];
  const xRequestId = req.headers["x-request-id"];

  if (!xSignature || !xRequestId) {
    throw new Error("Missing x-signature or x-request-id");
  }

  const signature = String(xSignature);
  const requestId = String(xRequestId);

  const signatureParts = signature.split(",");
  let ts = "";
  let v1 = "";

  for (const part of signatureParts) {
    const [key, value] = part.split("=");
    if (key?.trim() === "ts") ts = value?.trim();
    if (key?.trim() === "v1") v1 = value?.trim();
  }

  if (!ts || !v1) {
    throw new Error("Invalid x-signature format");
  }

  const dataId = req.query?.["data.id"];
  const idValue = dataId ? String(dataId) : "";

  let manifest = "";
  if (idValue) manifest += `id:${idValue};`;
  manifest += `request-id:${requestId};`;
  manifest += `ts:${ts};`;

  const hmac = crypto.createHmac("sha256", env.MERCADO_PAGO_WEBHOOK_SECRET);
  hmac.update(manifest);

  const generated = hmac.digest("hex");

  if (generated !== v1) {
    throw new Error("Invalid Mercado Pago signature");
  }
}
