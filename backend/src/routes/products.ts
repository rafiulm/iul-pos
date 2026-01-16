import { Router } from 'express';
import { z } from 'zod';
import * as productController from '../controllers/product.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Validation schemas
const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  emoji: z.string().min(1),
  stock: z.number().int().min(0).optional(),
});

// Get all products with optional filtering
router.get('/', async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const products = await productController.getProducts(
      category as string | undefined,
      search as string | undefined
    );
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Get product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await productController.getProductById(req.params.id as string);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Create new product (auth required)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const data = productSchema.parse(req.body);
    const product = await productController.createProduct(data);
    res.status(201).json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
});

// Update product (auth required)
router.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const data = productSchema.partial().safeParse(req.body);
    if (!data.success) {
      return res.status(400).json({ error: data.error.errors });
    }
    const product = await productController.updateProduct(req.params.id as string, data.data);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
});

// Delete product (auth required)
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const product = await productController.deleteProduct(req.params.id as string);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
