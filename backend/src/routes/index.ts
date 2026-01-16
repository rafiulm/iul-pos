import { Router } from 'express';
import productsRouter from './products';
import ordersRouter from './orders';
import categoriesRouter from './categories';
import healthRouter from './health';

const router = Router();

router.use('/products', productsRouter);
router.use('/orders', ordersRouter);
router.use('/categories', categoriesRouter);
router.use('/health', healthRouter);

export default router;
