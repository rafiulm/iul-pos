# Deployment Guide

This guide covers the deployment strategies for the IUL POS System. You can deploy using Docker Compose (recommended for self-hosting) or manually deploy the frontend and backend services separately.

## Prerequisites

- **Docker & Docker Compose** (for Docker deployment)
- **Node.js** v20+ (for manual deployment)
- **PostgreSQL** (external or local)
- **Google OAuth Credentials** (Client ID & Secret)

---

## Option 1: Docker Compose (Recommended)

This is the easiest way to run the entire stack (Database, Backend) locally or on a VPS.
_Note: Currently, the provided `docker-compose.yml` only sets up PostgreSQL. You would typically need to add the backend and frontend services to it for a full one-command deployment, but you can run them locally against the Dockerized DB._

### 1. Start the Database

```bash
docker-compose up -d
```

This spins up PostgreSQL on port `5434`.

### 2. Configure Environment Variables

Ensure your `backend/.env` points to this database:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/iulpos
```

### 3. Run Backend & Frontend (Locally)

Follow the "Manual Deployment" steps below to start the services effectively connecting to the Dockerized DB.

---

## Option 2: Manual Deployment

### 1. Database Setup

You need a PostgreSQL database.

- **Local**: Use Option 1 above.
- **Cloud**: Use providers like [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app).
  - Get your connection string: `postgresql://user:password@host:port/database`

### 2. Backend Deployment

The backend is an Express.js app.

**Build & Start:**

```bash
cd backend
npm install
npm run build
npm start
```

_The server will start on the port defined in `.env` (default 5001)._

**Environment Variables (`backend/.env`):**

```env
PORT=5001
# Allow calls from your production frontend domain
FRONTEND_URL=https://your-frontend-domain.com
DATABASE_URL=postgresql://...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
# Backend public URL (for auth callbacks)
BACKEND_URL=https://your-backend-domain.com
```

**Database Migrations:**
Ensure you run migrations on your production DB:

```bash
npm run db:migrate
```

### 3. Frontend Deployment

The frontend is a Vite React app.

**Build:**

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates a `dist` folder containing static files.

**Serving:**
You need a web server to serve the `dist` folder.

- **Static Host (Vercel/Netlify)**: Connect your repo and set the build command to `npm run build` and output dir to `dist`.
- **Nginx/Apache**: Point your web server root to the `dist` folder.
- **Node.js**: You can serve it using `serve` or similar packages.

**Environment Variables (`.env` or Build Settings):**
In Vite, env vars must be available at **build time**.

```env
VITE_BACKEND_URL=https://your-backend-domain.com
```

---

## Option 3: Cloud Providers

### Frontend (Vercel / Netlify)

1.  **Push** your code to GitHub.
2.  **Import** the project in Vercel/Netlify.
3.  **Settings**:
    - Build Command: `npm run build`
    - Output Directory: `dist`
    - Environment Variables: `VITE_BACKEND_URL`
4.  **Deploy**.

### Backend (Render / Railway / Fly.io)

1.  **Push** code to GitHub.
2.  **Create Web Service** in your chosen provider.
3.  **Root Directory**: Set to `backend/`.
4.  **Build Command**: `npm install && npm run build`
5.  **Start Command**: `npm start`
6.  **Environment Variables**: Add all variables from `backend/.env`.
7.  **Database**: Most of these providers offer a managed PostgreSQL addon. creating one and linking it `DATABASE_URL` is usually one click.

---

## Post-Deployment Checklist

1.  **Database Seeding**: Run `npm run db:seed` in the backend to populate initial categories and products.
2.  **Google OAuth**: Add your production domain (e.g., `https://your-frontend.com`) to "Authorized JavaScript origins" and `https://your-backend.com/api/auth/callback/google` to "Authorized redirect URIs" in Google Cloud Console.
3.  **CORS**: Ensure `FRONTEND_URL` in backend env matches your actual frontend domain.
