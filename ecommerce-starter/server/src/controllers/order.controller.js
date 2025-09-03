
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res, next) => {
  try {
    const items = await Promise.all((req.body.items || []).map(async it => {
      const p = await Product.findById(it.product);
      return { product: p._id, title: p.title, price: p.price, qty: it.qty || 1 };
    }));
    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    const order = await Order.create({ user: req.user.id, items, total });
    res.status(201).json(order);
  } catch (e) { next(e); }
};

export const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort("-createdAt");
    res.json(orders);
  } catch (e) { next(e); }
};
