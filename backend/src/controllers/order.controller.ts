import { db } from "../db/connection.js";
import { orders, orderItems } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import {
  logInfo,
  logSuccess,
  logError,
  logDatabase,
} from "../middleware/logger.js";

export async function getOrders(userId?: string) {
  logInfo("Fetching orders", { userId });

  const result = await db.query.orders.findMany({
    where: userId ? eq(orders.userId, userId) : undefined,
    orderBy: desc(orders.createdAt),
    with: {
      items: true,
    },
  });

  logSuccess("Orders fetched", { count: result.length, userId });
  return result;
}

export async function getOrderById(id: string) {
  logInfo("Fetching order by ID", { id });

  const order = await db.query.orders.findFirst({
    where: eq(orders.id, id),
    with: {
      items: true,
    },
  });

  if (order) {
    logSuccess("Order found", { id });
  } else {
    logError("Order not found", { id });
  }

  return order;
}

export async function createOrder(data: any, userId?: string) {
  logInfo("Creating order", { userId, total: data.total });

  const newOrder = {
    ...data,
    id: randomUUID(),
    userId,
    createdAt: new Date(),
  };

  const result = await db
    .insert(orders)
    .values(newOrder as any)
    .returning();

  logDatabase("INSERT", "orders", {
    id: result[0].id,
    userId,
    total: result[0].total,
  });
  logSuccess("Order created", { id: result[0].id });
  return result[0];
}

export async function updateOrderStatus(id: string, status: string) {
  logInfo("Updating order status", { id, status });

  const result = await db
    .update(orders)
    .set({ status })
    .where(eq(orders.id, id))
    .returning();

  if (result.length > 0) {
    logDatabase("UPDATE", "orders", { id, status });
    logSuccess("Order status updated", { id, status });
  } else {
    logError("Order not found for status update", { id });
  }

  return result[0];
}

export async function createOrderItems(items: any[]) {
  logInfo("Creating order items", { count: items.length });

  const itemsWithIds = items.map((item) => ({
    ...item,
    id: randomUUID(),
    createdAt: new Date(),
  }));
  const result = await db
    .insert(orderItems)
    .values(itemsWithIds as any)
    .returning();

  logDatabase("INSERT", "orderItems", { count: result.length });
  logSuccess("Order items created", { count: result.length });
  return result;
}
