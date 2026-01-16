# IUL POS System

A modern Point of Sale (POS) cashier application built with Vite, React, TypeScript, and Tailwind CSS.

## Features

- **Product Catalog**: Browse products with category filtering and search
- **Shopping Cart**: Add/remove items, quantity adjustments, automatic totals calculation
- **Checkout Flow**: Payment method selection (Cash, Card, Mobile), receipt generation
- **Order History**: View past orders, order details, receipt reprint
- **Product Management**: Add, edit, and delete products with inventory tracking

## Tech Stack

- **Vite** - Fast development server and build tool
- **React 19** - UI library with TypeScript support
- **Tailwind CSS v4** - Utility-first CSS with orange primary theme using @theme directive
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (current Node.js 20.18.2 may show warnings but works)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will be available at `http://localhost:5173` or `http://localhost:5174`

## Usage

### POS Interface
1. Browse products by category or search
2. Click "Add" to add products to cart
3. Click "Cart" in header to review items
4. Proceed to checkout and complete payment

### Product Management
1. Navigate to Products page
2. Click "Add Product" to create new products
3. Use edit/delete buttons to manage existing products

### Order History
1. Navigate to Orders page
2. View all past orders with status
3. Click eye icon to view order details

## Data

The application uses localStorage to persist:
- Shopping cart
- Products
- Orders

Initial dummy data includes:
- 60 products across 4 main categories (Food, Drinks, Snacks, Desserts)
- 20 past orders
- Various subcategories

## Color Scheme

Primary: Orange (#f97316)
Secondary: Dark Orange (#ea580c)
Background: Slate (#f8fafc)
Text: Slate (#0f172a)

## Project Structure

```
src/
├── components/
│   ├── layout/          # Sidebar, Header
│   ├── pos/             # ProductCatalog, ProductCard, CategoryFilter
│   ├── cart/            # ShoppingCart, CartItem
│   ├── checkout/        # CheckoutFlow, PaymentMethod, Receipt
│   ├── orders/          # OrderHistory, OrderDetails
│   └── products/        # ProductManagement, ProductForm
├── context/             # DataContext for state management
├── data/                # Dummy data
├── pages/               # Page components
├── types/               # TypeScript interfaces
├── App.tsx              # Main app with routing
└── main.tsx             # Entry point
```

## Configuration

This project uses TypeScript with strict type checking. The build is configured with Vite for optimal performance.

Tailwind CSS v4 is configured using CSS-based configuration:
- Custom colors defined in `@theme` directive in `src/index.css`
- No separate `tailwind.config.js` file needed
- All Tailwind utilities are available via `@import "tailwindcss"`

## Development Notes

- The project uses TypeScript's verbatimModuleSyntax flag, requiring type-only imports for types
- Tailwind CSS v4 uses CSS-based configuration with @theme directive for custom colors
- All data persists in localStorage for development convenience
