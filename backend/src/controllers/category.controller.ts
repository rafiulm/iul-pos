import { db } from "../db/connection.js";
import { categories } from "../db/schema.js";
import { eq } from "drizzle-orm";
import {
  logInfo,
  logSuccess,
  logError,
  logDatabase,
} from "../middleware/logger.js";

export async function getCategories() {
  logInfo("Fetching categories");

  const result = await db.select().from(categories);

  logSuccess("Categories fetched", { count: result.length });
  return result;
}

export async function getCategoryById(id: number) {
  logInfo("Fetching category by ID", { id });

  const result = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))
    .limit(1);
  const category = result[0];

  if (category) {
    logSuccess("Category found", { id });
  } else {
    logError("Category not found", { id });
  }

  return category;
}

export async function createCategory(data: any) {
  logInfo("Creating category", { name: data.name });

  const result = await db.insert(categories).values(data).returning();

  logDatabase("INSERT", "categories", {
    id: result[0].id,
    name: result[0].name,
  });
  logSuccess("Category created", { id: result[0].id });
  return result[0];
}

export async function updateCategory(id: number, data: any) {
  logInfo("Updating category", { id });

  const result = await db
    .update(categories)
    .set(data)
    .where(eq(categories.id, id))
    .returning();

  if (result.length > 0) {
    logDatabase("UPDATE", "categories", { id, name: result[0].name });
    logSuccess("Category updated", { id });
  } else {
    logError("Category not found for update", { id });
  }

  return result[0];
}

export async function deleteCategory(id: number) {
  logInfo("Deleting category", { id });

  const result = await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning();

  if (result.length > 0) {
    logDatabase("DELETE", "categories", { id, name: result[0].name });
    logSuccess("Category deleted", { id });
  } else {
    logError("Category not found for deletion", { id });
  }

  return result[0];
}
