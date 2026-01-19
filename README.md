# IUL POS System

A modern, full-stack Point of Sale (POS) cashier application. It features a responsive React frontend and a robust Express.js backend with PostgreSQL.

## Features

- **Storefront**: Browse products with categories, search, and dynamic cart management.
- **Checkout**: Flexible payment methods (Cash, Card, Mobile) and receipt generation.
- **Dashboard**: Order history, product management (CRUD), and inventory tracking.
- **Authentication**: Secure Google OAuth login.
- **Backend API**: RESTful API with PostgreSQL database and Drizzle ORM.

## Tech Stack

### Frontend

- **Vite** & **React 19**
- **Tailwind CSS v4** (with `@theme` configuration)
- **React Router** & **Lucide React**

### Backend

- **Express.js v4**
- **PostgreSQL** (via Docker)
- **Drizzle ORM** (Type-safe DB interaction)
- **Better Auth** (Authentication)

---

## Getting Started

### Prerequisites

- **Node.js** v20+
- **Docker** & **Docker Compose** (for the database)

### Quick Start

1.  **Clone the repository**
2.  **Start the Database**

    ```bash
    docker-compose up -d
    ```

    This starts PostgreSQL on port `5434`.

3.  **Setup Backend**

    ```bash
    cd backend
    npm install

    # Create .env (copy example)
    cp .env.example .env
    # NOTE: You need to set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env for auth to work!

    # Generate DB schema and seed data
    npm run db:setup

    # Start server
    npm run dev
    ```

    Backend runs on `http://localhost:5001`.

4.  **Setup Frontend** (Open a new terminal)
    ```bash
    # From project root
    npm install
    npm run dev
    ```
    Frontend runs on `http://localhost:5173`.

---

## Documentation Links

- **[Deployment Guide](./DEPLOYMENT.md)** - Detailed instructions for deploying to Docker, manual VPS, or Cloud Providers.
- **[Backend Documentation](./backend/README.md)** - In-depth guide to the API, database schema, and authentication.

---

## Usage Guide

### POS Interface

1.  **Browse**: Filter by category (Food, Drinks, etc.) or search by name.
2.  **Cart**: Add items, adjust quantities, and verify totals.
3.  **Checkout**: Select payment method and "Process Payment" to create an order.

### Admin Features

1.  **Product Management**: Add/Edit/Delete products. Stock levels are tracked.
2.  **Order History**: View past orders and details.

## Project Structure

```
iul-pos/
├── src/                 # React Frontend
│   ├── components/      # UI Components
│   ├── pages/           # Route Pages
│   └── ...
├── backend/             # Express Backend
│   ├── src/
│   │   ├── routes/      # API Routes
│   │   ├── db/          # Database & Migrations
│   │   └── ...
│   └── drizzle/         # Migration files
└── docker-compose.yml   # Database Configuration
```

## Configuration

- **Frontend**: `.env` (or Vite mode) handles `VITE_BACKEND_URL`.
- **Backend**: `backend/.env` handles Database URL, Auth secrets, and CORS.
- **Tailwind**: Configured via CSS variables in `src/index.css` (v4 style).
