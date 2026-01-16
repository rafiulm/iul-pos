# IUL POS Backend

RESTful API for IUL POS system built with Express.js v4, Better Auth, PostgreSQL, and Drizzle ORM.

## Features

- **Authentication**: Google OAuth via Better Auth
- **Products API**: CRUD operations for products
- **Orders API**: Order management and history
- **Categories API**: Category management
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod schemas for request validation
- **Logging**: Comprehensive server logging with timestamps

## Tech Stack

- **Express.js v4** - Web framework
- **Better Auth** - Authentication with Google OAuth
- **PostgreSQL** - Relational database (via Docker)
- **Drizzle ORM** - Type-safe database queries
- **TypeScript** - Type safety
- **Zod** - Request validation
- **CORS** - Cross-origin resource sharing

## Important: Better Auth Setup with Express v4

When using Better Auth with Express v4, the handler must be mounted **before** `express.json()` middleware to avoid issues:

```typescript
// ✅ Correct order for Express v4
app.all("/api/auth/*", toNodeHandler(auth));  // Mount first
app.use(express.json());                        // Then mount body parser

// ❌ Wrong order - will cause issues
app.use(express.json());                        // Don't mount first
app.all("/api/auth/*", toNodeHandler(auth));
```

This is critical for Express v4 compatibility with Better Auth.

## Getting Started

### Prerequisites

- Docker (for PostgreSQL)
- Node.js 20+ 
- npm or yarn
- Google OAuth credentials (for auth)

### Installation

```bash
cd backend
npm install
```

### Configuration

Create a `.env` file in the backend directory:

```env
# Backend
PORT=5001
BACKEND_URL=http://localhost:5001
FRONTEND_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/iulpos

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Start PostgreSQL (Docker)

```bash
# From project root
docker-compose up -d
```

The PostgreSQL container runs on port 5434 (mapped to internal 5432).

### Database Schema

Tables created:
- `users` - User accounts (managed by Better Auth)
- `sessions` - User sessions (managed by Better Auth)
- `accounts` - OAuth accounts (managed by Better Auth)
- `categories` - Product categories
- `products` - Products with stock management
- `orders` - Order records
- `order_items` - Order line items

### Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Database Operations

```bash
# Generate migration files from schema changes
npm run db:generate

# Push schema changes directly to database (development only)
npm run db:push

# Apply pending migrations to database
npm run db:migrate

# Seed database with initial data
npm run db:seed

# Open Drizzle Studio (database GUI)
npm run db:studio

# Complete database setup (generate + migrate + seed)
npm run db:setup
```

For detailed database documentation, see [src/db/README.md](./src/db/README.md)

### Manual Database Seeding

If automatic seeding fails, use direct SQL:

```bash
# Insert categories
docker exec iul-pos-db psql -U postgres -d iulpos -c "INSERT INTO categories (name) VALUES ('Burgers'), ('Pizza'), ('Sandwiches'), ('Salads'), ('Soft Drinks'), ('Coffee'), ('Tea'), ('Smoothies'), ('Chips'), ('Cookies'), ('Candy'), ('Ice Cream'), ('Cakes'), ('Pastries');"

# Insert products
docker exec iul-pos-db psql -U postgres -d iulpos -c "INSERT INTO products (id, name, price, category, emoji, stock, \"createdAt\", \"updatedAt\") VALUES ('prd-001', 'Classic Burger', '8.99', 'Burgers', '🍔', 50, NOW(), NOW()), ('prd-002', 'Cheese Burger', '9.99', 'Burgers', '🍔', 45, NOW(), NOW()), ('prd-003', 'Pepperoni Pizza', '12.99', 'Pizza', '🍕', 25, NOW(), NOW()), ('prd-004', 'Club Sandwich', '7.99', 'Sandwiches', '🥪', 35, NOW(), NOW()), ('prd-005', 'Caesar Salad', '7.99', 'Salads', '🥗', 30, NOW(), NOW());"
```

## API Endpoints

### Health Check
```
GET /health
GET /
```

### Authentication (Better Auth)
```
POST   /api/auth/*splat    # All auth operations handled by Better Auth
```

### Products
```
GET    /api/products              # List all products (query params: category, search)
GET    /api/products/:id          # Get product by ID
POST   /api/products              # Create product (auth required)
PUT    /api/products/:id          # Update product (auth required)
DELETE /api/products/:id          # Delete product (auth required)
```

### Orders
```
GET    /api/orders                # List orders (auth required, filters by userId)
GET    /api/orders/:id          # Get order by ID (auth required)
POST   /api/orders               # Create order (auth required)
PUT    /api/orders/:id          # Update order status (auth required)
```

### Categories
```
GET    /api/categories           # List all categories
GET    /api/categories/:id       # Get category by ID
POST   /api/categories           # Create category (auth required)
PUT    /api/categories/:id       # Update category (auth required)
DELETE /api/categories/:id       # Delete category (auth required)
```

## Project Structure

```
backend/
├── src/
│   ├── auth/                # Better Auth configuration
│   │   └── auth.ts
│   ├── db/                  # Database layer
│   │   ├── connection.ts    # PostgreSQL connection pool
│   │   ├── schema.ts        # Drizzle schema definitions
│   │   ├── migrate.ts       # Migration runner script
│   │   ├── seed.ts          # Database seeding script
│   │   ├── index.ts         # Centralized exports & utilities
│   │   └── README.md        # Database documentation
│   ├── routes/               # API routes
│   │   ├── index.ts         # Route aggregator
│   │   ├── products.ts      # Product endpoints
│   │   ├── orders.ts        # Order endpoints
│   │   ├── categories.ts    # Category endpoints
│   │   └── health.ts        # Health check
│   ├── controllers/          # Route controllers (business logic)
│   │   ├── product.controller.ts
│   │   ├── order.controller.ts
│   │   └── category.controller.ts
│   ├── middleware/          # Custom middleware
│   │   ├── auth.ts          # Authentication middleware
│   │   ├── error.ts         # Error handler
│   │   └── logger.ts        # Request logger
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── index.ts             # Express app entry point
├── drizzle/                 # Generated migration files
├── drizzle.config.ts        # Drizzle Kit configuration
├── .gitignore
├── package.json
├── tsconfig.json
└── .env.example
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized JavaScript origins: `http://localhost:5173`
6. Add authorized redirect URI: `http://localhost:5001/api/auth/callback/google`
7. Copy Client ID and Secret to `.env`

## Authentication Flow

1. Client initiates OAuth flow via Better Auth
2. User authenticates with Google
3. Google redirects to callback URL
4. Better Auth creates session
5. Client receives session cookie
6. All subsequent requests include session cookie
7. Auth middleware validates session on protected routes

## Error Handling

- 400 - Bad Request (validation errors)
- 401 - Unauthorized (missing/invalid session)
- 404 - Not Found (resource doesn't exist)
- 500 - Internal Server Error

## CORS Configuration

CORS is enabled for frontend origin:
- Default: `http://localhost:5173`
- Configured via `FRONTEND_URL` environment variable
- Credentials enabled for session cookies

## Development Notes

- Server runs on port 5001 by default
- All mutation endpoints require authentication
- Input validation performed on all requests
- Database schema can be updated via `drizzle-kit push`
- Better Auth handles all authentication routes

## Testing

### Test Health Endpoint
```bash
curl http://localhost:5001/health
```

### Test Products Endpoint
```bash
curl http://localhost:5001/api/products
```

### Test Categories Endpoint
```bash
curl http://localhost:5001/api/categories
```

## Known Issues

1. **Drizzle Query Issues**: If automatic seeding fails, use direct SQL commands shown above
2. **Port Conflicts**: Backend uses port 5001, ensure it's available
3. **Database Connection**: Ensure PostgreSQL container is running and DATABASE_URL is correct

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Use strong database passwords
3. Enable HTTPS
4. Configure proper CORS origins
5. Set up proper Google OAuth callback URLs
6. Use a managed PostgreSQL service (Neon, Supabase, AWS RDS, etc.)

## License

MIT
