
import Product from "../models/Product.js";

export const list = async (req, res, next) => {
  try {
    const q = await Product.find().sort("-createdAt");
    res.json(q);
  } catch (e) { next(e); }
};

export const getOne = async (req, res, next) => {
  try {
    const doc = await Product.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    if (!req.user?.isAdmin) return res.status(403).json({ message: "Forbidden" });
    const doc = await Product.create(req.body);
    res.status(201).json(doc);
  } catch (e) { next(e); }
};

export const update = async (req, res, next) => {
  try {
    if (!req.user?.isAdmin) return res.status(403).json({ message: "Forbidden" });
    const doc = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doc);
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try {
    if (!req.user?.isAdmin) return res.status(403).json({ message: "Forbidden" });
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (e) { next(e); }
};
