import { Router } from "express";
import { createCheckoutController } from "../controllers/checkout.controller";

const router = Router();

/**
 * POST /api/checkout
 * Cria pedido no Mongo + gera preference do Mercado Pago (Checkout Pro)
 */
router.post("/", createCheckoutController);

export default router;
