# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies + tsx for migrations
RUN npm ci --only=production && npm install tsx

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Copy drizzle config and migrations
COPY --from=builder /app/drizzle ./drizzle
COPY drizzle.config.ts ./

# Copy source files needed for migrations (seed uses tsx)
COPY --from=builder /app/src ./src

# Copy scripts
COPY scripts ./scripts
RUN chmod +x ./scripts/*.sh

# Environment variables (can be overridden at runtime)
ENV NODE_ENV=production
ENV PORT=5001

# Expose port
EXPOSE 5001


# Start the application
CMD ["node", "dist/index.js"]

