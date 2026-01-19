import { Router } from "express";
import { z } from "zod";
import * as categoryController from "../controllers/category.controller.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Validation schema
const categorySchema = z.object({
  name: z.string().min(1),
  parentId: z.number().optional(),
});

// Get all categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await categoryController.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// Get category by ID
router.get("/:id", async (req, res, next) => {
  try {
    const category = await categoryController.getCategoryById(
      parseInt(req.params.id as string),
    );
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
});

// Create new category (auth required)
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const data = categorySchema.parse(req.body);
    const category = await categoryController.createCategory(data);
    res.status(201).json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
});

// Update category (auth required)
router.put("/:id", requireAuth, async (req, res, next) => {
  try {
    const data = categorySchema.partial().safeParse(req.body);
    if (!data.success) {
      return res.status(400).json({ error: data.error.errors });
    }
    const category = await categoryController.updateCategory(
      parseInt(req.params.id as string),
      data.data,
    );
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    next(error);
  }
});

// Delete category (auth required)
router.delete("/:id", requireAuth, async (req, res, next) => {
  try {
    const category = await categoryController.deleteCategory(
      parseInt(req.params.id as string),
    );
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
