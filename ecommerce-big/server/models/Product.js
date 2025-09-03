import mongoose from "mongoose";

export default mongoose.model("Product", new mongoose.Schema({
  title:       { type: String, required: true },
  description: String,
  image:       String,
  price:       { type: Number, required: true, min: 0 },
  salePrice:   { type: Number, default: null },
  stock:       { type: Number, default: 0 },

  // add these two:
  category: { type: String, enum: ["men","women","kids","accessories","footwear"], required: true },
  brand:    { type: String, enum: ["nike","adidas","puma","levis","zara","hm"], required: true },
}, { timestamps: true }));