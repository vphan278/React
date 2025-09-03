// server/server.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ---- Create app FIRST ----
const app = express();

// ---- Config ----
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const MONGO = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!MONGO) {
  console.error("Missing MONGODB_URI/MONGO_URI in server/.env");
  process.exit(1);
}

// ---- Middleware ----
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ---- DB ----
mongoose
  .connect(MONGO)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// ---- Routes ----
const authRoutes = require("./routes/auth/auth-routes");
const shopProductRoutes = require("./routes/shop/products-routes");
const shopCartRoutes = require("./routes/shop/cart-routes");
const shopOrderRoutes = require("./routes/shop/order-routes");
const shopReviewRoutes = require("./routes/shop/review-routes");
const shopSearchRoutes = require("./routes/shop/search-routes");
const shopAddressRoutes = require("./routes/shop/address-routes");
const adminProductRoutes = require("./routes/admin/products-routes");
const adminOrderRoutes = require("./routes/admin/order-routes");

app.use("/api/auth", authRoutes);
app.use("/api/shop/products", shopProductRoutes);
app.use("/api/shop/cart", shopCartRoutes);
app.use("/api/shop/orders", shopOrderRoutes);
app.use("/api/shop/review", shopReviewRoutes);
app.use("/api/shop/search", shopSearchRoutes);
app.use("/api/shop/address", shopAddressRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// ---- Start ----
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});