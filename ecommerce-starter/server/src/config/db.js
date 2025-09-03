import mongoose from "mongoose";

console.log("CWD =", process.cwd());
console.log("MONGO_URI =", process.env.MONGO_URI);

export default async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("Missing MONGO_URI in .env");
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}