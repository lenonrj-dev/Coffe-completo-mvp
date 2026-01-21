import { Router } from "express";
import { listProductsController } from "../controllers/products.controller";

const router = Router();

/**
 * GET /api/products
 * Retorna catálogo para o frontend
 */
router.get("/", listProductsController);

export default router;
