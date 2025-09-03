
import "dotenv/config";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const products = [
  { title: "Classic Tee", description: "Soft cotton tee", price: 19.99, stock: 100, image: "https://picsum.photos/seed/tee/400/300" },
  { title: "Hoodie", description: "Cozy hoodie", price: 49.99, stock: 60, image: "https://picsum.photos/seed/hoodie/400/300" },
  { title: "Sneakers", description: "Everyday sneakers", price: 79.99, stock: 40, image: "https://picsum.photos/seed/sneakers/400/300" }
];

async function run() {
  await connectDB();
  await Product.deleteMany({});
  await User.deleteMany({});
  await Product.insertMany(products);
  const admin = new User({ name: "Demo Admin", email: "demo@shop.dev", password: "demopass", isAdmin: true });
  await admin.save();
  console.log("Seeded products & demo user:", admin.email);
  process.exit(0);
}
run();
