import { Router } from "express";
import productsRouter from "./products.js";
import ordersRouter from "./orders.js";
import categoriesRouter from "./categories.js";
import healthRouter from "./health.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/orders", ordersRouter);
router.use("/categories", categoriesRouter);
router.use("/health", healthRouter);

export default router;
