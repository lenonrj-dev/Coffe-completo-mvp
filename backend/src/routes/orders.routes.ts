import { Router } from "express";
import {
  listOrdersController,
  getOrderController,
  adminListOrdersController,
  adminUpdateOrderStatusController,
} from "../controllers/orders.controller";

const router = Router();

/**
 * GET /api/orders?email=...&phone=...
 * Lista pedidos do cliente
 */
router.get("/", listOrdersController);

/**
 * GET /api/orders/:id
 * Detalha pedido
 */
router.get("/:id", getOrderController);

/**
 * ADMIN
 * GET /api/orders/admin/all
 */
router.get("/admin/all", adminListOrdersController);

/**
 * ADMIN
 * PATCH /api/orders/admin/:id/status
 * body: { orderStatus }
 */
router.patch("/admin/:id/status", adminUpdateOrderStatusController);

export default router;
