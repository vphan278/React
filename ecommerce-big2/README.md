
# **E-Commerce Big 2**

[![React](https://img.shields.io/badge/Frontend-React-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A full-stack **MERN E-Commerce Application** with authentication, product catalog, cart, and checkout functionality.

---

## **Live Demo**
👉 [**View Demo**](https://your-live-demo-link.com) *(Replace with your deployed URL)*

---

## **Features**

- **User Authentication**
  - Register/Login using JWT authentication
  - Protected routes for cart and checkout

- **Product Catalog**
  - Filter by category or brand
  - Product details with reviews and ratings

- **Cart & Checkout**
  - Syncs cart across sessions for logged-in users
  - Local storage fallback for guests
  - Place orders and view order history

- **Frontend**
  - Built with React, Redux Toolkit, and Vite
  - Responsive & mobile-friendly

- **Backend**
  - Node.js + Express REST API
  - MongoDB with Mongoose
  - JWT-secured authentication

---

## **Screenshots**

### **Home Page**
![Home](screenshots/home.png)

### **Product Listing**
![Listing](screenshots/listing.png)

### **Checkout Page**
![Checkout](screenshots/checkout.png)

---

## **Project Structure**

```
ecommerce-big2/
├── client/          # React frontend
│   ├── src/
│   │   ├── pages/         # Home, Listing, Checkout, Login, Register
│   │   ├── store/         # Redux slices (auth, cart, products)
│   │   ├── components/    # Reusable UI components
│   │   └── App.jsx        # Main app entry
├── server/          # Node/Express backend (API)
│   ├── controllers/ # Route handlers
│   ├── models/      # Mongoose schemas
│   ├── routes/      # Express routes
│   └── server.js    # Server entry point
└── README.md
```

---

## **Installation & Setup**

### **Frontend**
```bash
cd client
npm install
npm run dev
```

### **Backend**
```bash
cd server
npm install
cp .env.example .env   # Add your environment variables
npm run dev
```

### **Environment Variables**
Create `.env` inside `server`:
```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
PORT=5000
```

---

## **API Endpoints**

| Method | Endpoint                  | Description             |
|---------|--------------------------|-------------------------|
| POST    | /api/auth/register       | Register new user      |
| POST    | /api/auth/login          | Login user            |
| GET     | /api/products           | Get all products      |
| GET     | /api/products/:id       | Get product details   |
| POST    | /api/cart/add           | Add product to cart   |
| GET     | /api/cart/get/:userId   | Get user's cart       |
| POST    | /api/orders            | Place order          |

---

## **Deployment**

- **Frontend:** [Vercel](https://vercel.com) / [Netlify](https://netlify.com)
- **Backend:** [Render](https://render.com) / [Railway](https://railway.app)

---

## **License**

This project is licensed under the [MIT License](LICENSE).
