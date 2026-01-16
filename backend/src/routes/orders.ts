import { Router } from 'express';
import { z } from 'zod';
import * as orderController from '../controllers/order.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Validation schemas
const orderSchema = z.object({
  status: z.enum(['completed', 'refunded']),
  paymentMethod: z.enum(['cash', 'card', 'mobile']),
  subtotal: z.number().positive(),
  tax: z.number().positive(),
  total: z.number().positive(),
  items: z.array(z.object({
    productId: z.string(),
    productName: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
  })),
});

// Get all orders (auth required)
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const userId = (req as any).user?.id;
    const orders = await orderController.getOrders(userId);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Get order by ID (auth required)
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const order = await orderController.getOrderById(req.params.id as string);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// Create new order (auth required)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const data = orderSchema.parse(req.body);
    const userId = (req as any).user?.id;
    
    const { items, ...orderData } = data;
    const order = await orderController.createOrder(orderData, userId);
    await orderController.createOrderItems(items.map(item => ({
      ...item,
      orderId: order.id,
    })));
    
    res.status(201).json(order);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
});

// Update order status (auth required)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status || !['completed', 'refunded'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const order = await orderController.updateOrderStatus(req.params.id as string, status);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

export default router;
