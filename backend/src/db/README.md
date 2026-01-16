# Database Setup (Drizzle ORM)

This directory contains all database-related configuration and utilities.

## Directory Structure

```
src/db/
├── connection.ts    # Database connection and pool setup
├── schema.ts        # Database schema definitions
├── migrate.ts       # Migration runner script
├── seed.ts          # Database seeding script
└── index.ts         # Centralized exports and utilities

drizzle/             # Generated migration files (auto-generated)
```

## Configuration

The Drizzle configuration is in `drizzle.config.ts` at the project root:

```typescript
{
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  verbose: true,
  strict: true,
}
```

## Available Scripts

```bash
# Generate migrations from schema changes
npm run db:generate

# Push schema changes directly to database (development only)
npm run db:push

# Run pending migrations
npm run db:migrate

# Seed the database with initial data
npm run db:seed

# Open Drizzle Studio (visual database browser)
npm run db:studio

# Complete setup: generate, migrate, and seed
npm run db:setup
```

## Schema Overview

### Tables

- **users** - User accounts (managed by Better Auth)
- **sessions** - User sessions (managed by Better Auth)
- **accounts** - OAuth provider accounts (managed by Better Auth)
- **verification** - Email verification and OAuth states (managed by Better Auth)
- **categories** - Product categories
- **products** - Product inventory
- **orders** - Customer orders
- **order_items** - Individual items in an order

### Relations

- Users → Sessions (one-to-many)
- Users → Accounts (one-to-many)
- Users → Orders (one-to-many)
- Orders → Order Items (one-to-many)
- Orders → User (many-to-one)
- Order Items → Orders (many-to-one)

## Usage

### Direct Database Access

```typescript
import { db, products, categories } from '@/db';

// Query with filters
const products = await db
  .select()
  .from(products)
  .where(eq(products.category, 'Burgers'))
  .orderBy(desc(products.createdAt));

// Create record
const newProduct = await db
  .insert(products)
  .values({
    id: randomUUID(),
    name: 'New Product',
    price: '9.99',
    category: 'Burgers',
    emoji: '🍔',
    stock: 10,
  })
  .returning();
```

### Transactions

```typescript
import { withTransaction } from '@/db';

await withTransaction(async (tx) => {
  // All operations run in a single transaction
  await tx.insert(orders).values(orderData);
  await tx.insert(orderItems).values(itemsData);
  
  // If any operation fails, all are rolled back
});
```

### Health Check

```typescript
import { healthCheck } from '@/db';

const health = await healthCheck();
// { status: 'healthy', timestamp: '2025-01-16T...' }
```

## Type Safety

All tables have TypeScript types automatically inferred:

```typescript
import type { Product, NewProduct, Category } from '@/db';

const product: Product = { ... };
const newProduct: NewProduct = { ... };
```

## Migration Workflow

1. **Modify Schema**: Edit `schema.ts` to add/change tables
2. **Generate Migration**: Run `npm run db:generate` to create migration files
3. **Review Migration**: Check generated SQL in `drizzle/` folder
4. **Apply Migration**: Run `npm run db:migrate` to apply to database
5. **Seed (optional)**: Run `npm run db:seed` to populate with test data

## Connection Pooling

The database uses a connection pool managed by pg:

```typescript
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
```

Pool events are logged automatically:
- `connect` - When a new connection is established
- `error` - When a connection error occurs

## Best Practices

1. **Always use TypeScript types** - Import types from `@/db` for type safety
2. **Use transactions** - When modifying multiple related tables
3. **Handle errors** - All database operations should be wrapped in try/catch
4. **Environment variables** - Never commit `DATABASE_URL` to version control
5. **Migrations** - Always generate and review migrations before pushing changes
6. **Indexing** - Add indexes to frequently queried columns in schema

## Troubleshooting

### Connection Issues

Check your `.env` file has the correct `DATABASE_URL`:
```
DATABASE_URL=postgresql://user:password@host:port/database
```

### Migration Conflicts

If migrations get out of sync, you can:
1. Use `npm run db:push` for development (bypasses migrations)
2. Manually check the `drizzle/_journal.json` file
3. Delete and recreate the database (development only)

### Seed Data Issues

If seeding fails:
1. Check if categories already exist (script uses `onConflictDoNothing`)
2. Verify database connection is working
3. Check logs for specific error messages
