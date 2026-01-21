import { Router } from "express";
import checkoutRoutes from "./checkout.routes";
import ordersRoutes from "./orders.routes";
import webhookRoutes from "./webhook.routes";
import productsRoutes from "./products.routes";

const router = Router();

router.get("/health", (_req, res) => {
  return res.status(200).json({ ok: true });
});

router.use("/products", productsRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/orders", ordersRoutes);
router.use("/webhook", webhookRoutes);

export default router;
