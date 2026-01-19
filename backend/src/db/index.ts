export { db } from "./connection.js";
export * from "./schema.js";

import { db } from "./connection.js";
import { products } from "./schema.js";
import { logError } from "../middleware/logger.js";

export async function healthCheck(): Promise<{
  status: string;
  timestamp: string;
}> {
  try {
    await db.select().from(products).limit(1);
    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    logError("Database health check failed", error);
    throw new Error("Database connection failed");
  }
}
