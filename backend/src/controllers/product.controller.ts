import { db } from '../db/connection';
import { products } from '../db/schema';
import { eq, desc, like, or, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { logInfo, logSuccess, logError, logDatabase } from '../middleware/logger';

export async function getProducts(category?: string, search?: string) {
  logInfo('Fetching products', { category, search });
  
  let query = db.select().from(products);
  
  if (category && category !== 'All' && search) {
    query = query.where(
      and(
        eq(products.category, category),
        or(like(products.name, `%${search}%`))
      )
    ) as any;
  } else if (category && category !== 'All') {
    query = query.where(eq(products.category, category)) as any;
  } else if (search) {
    query = query.where(like(products.name, `%${search}%`)) as any;
  }
  
  const result = await query.orderBy(desc(products.createdAt));
  logSuccess('Products fetched', { count: result.length });
  return result;
}

export async function getProductById(id: string) {
  logInfo('Fetching product by ID', { id });
  
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  const product = result[0];
  
  if (product) {
    logSuccess('Product found', { id });
  } else {
    logError('Product not found', { id });
  }
  
  return product;
}

export async function createProduct(data: any) {
  logInfo('Creating product', { name: data.name });
  
  const newProduct = {
    ...data,
    id: randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const result = await db.insert(products).values(newProduct as any).returning();
  logDatabase('INSERT', 'products', { id: result[0].id, name: result[0].name });
  logSuccess('Product created', { id: result[0].id });
  return result[0];
}

export async function updateProduct(id: string, data: any) {
  logInfo('Updating product', { id });
  
  const result = await db
    .update(products)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning();
  
  if (result.length > 0) {
    logDatabase('UPDATE', 'products', { id, name: result[0].name });
    logSuccess('Product updated', { id });
  } else {
    logError('Product not found for update', { id });
  }
  
  return result[0];
}

export async function deleteProduct(id: string) {
  logInfo('Deleting product', { id });
  
  const result = await db.delete(products).where(eq(products.id, id)).returning();
  
  if (result.length > 0) {
    logDatabase('DELETE', 'products', { id, name: result[0].name });
    logSuccess('Product deleted', { id });
  } else {
    logError('Product not found for deletion', { id });
  }
  
  return result[0];
}
