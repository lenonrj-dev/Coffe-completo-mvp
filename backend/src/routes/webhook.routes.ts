import { Router } from "express";
import { mercadoPagoWebhookController } from "../controllers/webhook.controller";
import { pendingController } from "../controllers/pending.controller";

const router = Router();

/**
 * POST /api/webhook/mercadopago?data.id=123
 */
router.post("/mercadopago", mercadoPagoWebhookController);

/**
 * GET /api/webhook/pending?payment_id=...&external_reference=...
 */
router.get("/pending", pendingController);

export default router;
