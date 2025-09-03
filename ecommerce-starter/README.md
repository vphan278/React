
# MERN E‑Commerce Starter

A minimal but complete MERN stack e‑commerce app with **auth, products, cart, and orders**.
It’s designed to run locally with **MongoDB Atlas** (or local Mongo).

## Quick start

### 1) Server
```bash
cd server
cp .env.example .env
# edit .env with your Mongo URI and a JWT secret
npm install
npm run seed   # loads sample products & a test user
npm run dev    # starts API on http://localhost:5000
```

### 2) Client
Open a new terminal:
```bash
cd client
npm install
npm run dev    # opens http://localhost:5173
```

### Test credentials
- **email:** demo@shop.dev
- **password:** demopass

### Notes
- Client is Vite + React Router. API is Express + MongoDB (Mongoose).
- Auth uses JWT in **httpOnly** cookie.
- CORS configured for http://localhost:5173
- To change the client URL or port, see `server/src/index.js` and `client/vite.config.js`.

Enjoy and extend: image uploads, admin dashboard, payments, etc.
