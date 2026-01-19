import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./connection.js";
import { logInfo, logSuccess, logError } from "../middleware/logger.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsFolder = path.join(__dirname, "../../drizzle");

async function main() {
  logInfo("Starting database migrations...", { path: migrationsFolder });

  try {
    await migrate(db, { migrationsFolder });

    logSuccess("Database migrations completed successfully!");
    process.exit(0);
  } catch (error) {
    logError("Database migrations failed", error);
    process.exit(1);
  }
}

main();
