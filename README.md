# E‑commerce Store (Frontend)

React frontend for the Afternoon e‑commerce store: shop, cart, auth, checkout.

## Prerequisites

- **Node.js** v18+ (or v16+)
- Backend API running (see [e-commerce-backend/README.md](../e-commerce-backend/README.md))

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. API URL (optional)

The app talks to the backend at **http://localhost:5001/api** by default.

To override (e.g. for production or another host), set:

```env
REACT_APP_API_URL=http://localhost:5001/api
```

Use a `.env` file in this folder or set the variable before starting.

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server (React) |
| `npm run build` | Production build |
| `npm test` | Run tests |

## Running the store

```bash
npm start
```

The app runs at **http://localhost:3000**.

Make sure the **backend** is running on port 5001 (or the URL you set) so login, products, and cart work.

## Features

- Browse products (Shop All, categories, sale, new, bestseller)
- Sign in / Sign up
- Guest cart (localStorage) merged on login
- Cart and checkout (authenticated)
- Contact form (submits to backend inquiries API)
