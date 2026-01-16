import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "./schema";
import { logInfo, logError, logSuccess } from "../middleware/logger";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  logSuccess("Database connection established");
});

pool.on("error", (err) => {
  logError("Unexpected database connection error", err);
});

export const db = drizzle(pool, { schema });

try {
  const dbUrl = new URL(process.env.DATABASE_URL);
  logInfo("Database pool initialized", {
    host: dbUrl.hostname || "localhost",
    database: dbUrl.pathname?.slice(1) || "unknown",
  });
} catch (error) {
  logInfo("Database pool initialized", {
    message: "Could not parse DATABASE_URL",
  });
}
