
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const sign = (user) => jwt.sign(
  { id: user._id, email: user.email, isAdmin: user.isAdmin },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

export const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ id: user._id, email: user.email });
  } catch (e) { next(e); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.compare(password)))
      return res.status(400).json({ message: "Invalid credentials" });
    const token = sign(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 3600 * 1000
    }).json({ ok: true, id: user._id, email: user.email, isAdmin: user.isAdmin });
  } catch (e) { next(e); }
};

export const me = async (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, isAdmin: req.user.isAdmin });
};

export const logout = async (req, res) => {
  res.clearCookie("token").json({ ok: true });
};
