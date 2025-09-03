# ecommerce-big (ready)

Full-stack e-commerce app with:
- Brand → Listing → Add to Cart → Checkout flow
- Local (frontend) cart fallback if not logged in (localStorage)
- Server cart for authenticated users (Mongo + Express)

## Quick Start

### 1) Server
```bash
cd server
cp .env.example .env  # set MONGO_URI and JWT_SECRET
npm install
npm run dev           # runs on http://localhost:5000
```

Environment variables:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=supersecret
PAYPAL_CLIENT_ID=
```
Seed (optional):
```bash
node src/data/seed.js
```

### 2) Client
```bash
cd client
npm install
npm run dev           # Vite dev server (default http://localhost:5173)
```

**NOTE:** Client uses absolute URLs to `http://localhost:5000` in the Redux thunks.

## Features you asked for
- Click **brand** on home → opens `/shop/listing?brand=<brand>`
- Click **Add to cart** from product card or details:
  - If **not logged in** → item is added to local cart + navigate to **/shop/checkout**
  - If **logged in** → uses server cart API (unchanged)
- Checkout page reads from Redux cart state (server or local).

If you want server-only behavior, log in; if you want it to work without the server, the local cart covers it.
