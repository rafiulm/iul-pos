import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./auth/auth.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.js";
import { logger, logInfo, logSuccess } from "./middleware/logger.js";

const app = express();
const PORT = process.env.PORT || 5001;

logInfo("Starting server...", {
  port: PORT,
  nodeEnv: process.env.NODE_ENV || "development",
});

// CORS Middleware - must come BEFORE auth handler
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5174",
    credentials: true,
  }),
);

logInfo("CORS configured", {
  origin: process.env.FRONTEND_URL || "http://localhost:5174",
});

// Mount Better Auth handler (before express.json() and logger)
app.all("/api/auth/*", toNodeHandler(auth));

logInfo("Better Auth handler mounted at /api/auth/*");

// Request logger middleware
app.use(logger);

// Body parser
app.use(express.json());

logInfo("Request body parser configured");

// API Routes
app.use("/api", routes);

logInfo("API routes mounted at /api");

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "IUL POS Backend API",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
app.use(errorHandler);

logInfo("Error handling middleware configured");

app.listen(PORT, () => {
  logSuccess("Server started successfully", {
    url: `http://localhost:${PORT}`,
    port: PORT,
    environment: process.env.NODE_ENV || "development",
  });
  console.log(``);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/`);
  console.log(`🔐 Auth: http://localhost:${PORT}/api/auth/*`);
  console.log(`📦 API: http://localhost:${PORT}/api`);
  console.log(``);
});
