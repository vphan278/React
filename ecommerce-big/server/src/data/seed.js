// server/src/data/seed.js  (CommonJS)
require("dotenv").config();
const mongoose = require("mongoose");

// Be resilient to how models are exported (default / named / module.exports)
function resolveModel(mod, name) {
  // If it's a raw model already
  if (mod && typeof mod.deleteMany === "function" && mod.modelName) return mod;
  // If it has a default export
  if (mod && mod.default && typeof mod.default.deleteMany === "function") return mod.default;
  // If it exports { Product } / { User }
  if (mod && mod[name] && typeof mod[name].deleteMany === "function") return mod[name];
  // If it exported the schema only (rare), throw a clearer error
  throw new Error(`${name} model not found in module (check exports in models/${name}.js)`);
}

// Adjust paths: seed.js is in server/src/data; models are in server/models
const ProductMod = require("../../models/Product");
const UserMod = require("../../models/User");

const Product = resolveModel(ProductMod, "Product");
const User = resolveModel(UserMod, "User");

const MONGO = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!MONGO) {
  console.error("❌ Missing MONGODB_URI/MONGO_URI in server/.env");
  process.exit(1);
}

const products = [
  { title: "Nike Men Tee", description: "Cotton tee", image: "https://picsum.photos/seed/nmtee/600/400", price: 19.99, stock: 100, category: "men", brand: "nike" },
  { title: "Adidas Hoodie", description: "Fleece hoodie", image: "https://picsum.photos/seed/amh/600/400", price: 49.99, stock: 80, category: "men", brand: "adidas" },
  { title: "Levi's Women Jeans", description: "High-rise jeans", image: "https://picsum.photos/seed/lwj/600/400", price: 69.99, stock: 90, category: "women", brand: "levis" },
  { title: "H&M Kids Tee", description: "Graphic tee", image: "https://picsum.photos/seed/hmk/600/400", price: 12.99, stock: 120, category: "kids", brand: "hm" },
];

(async () => {
  try {
    await mongoose.connect(MONGO);
    console.log("MongoDB connected (seed)");

    await Product.deleteMany({});
    await Product.insertMany(products);

    await User.deleteMany({});
    const admin = new User({
      userName: "Demo Admin",
      email: "demo@shop.dev",
      password: "demopass",
      isAdmin: true,
    });
    await admin.save();

    console.log(`🌱 Seeded ${products.length} products & demo user: ${admin.email}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
})();