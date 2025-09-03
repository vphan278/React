// server/controllers/auth/auth-controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User"); // <- correct relative path
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";

// POST /api/auth/register
async function registerUser(req, res) {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password)
      return res.status(400).json({ success:false, message:"Missing fields" });

    const exists = await User.findOne({ $or: [{ email }, { userName }] });
    if (exists) return res.status(400).json({ success:false, message:"User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const u = await User.create({ userName, email, password: hash, isAdmin:false });

    return res.status(201).json({
      success:true,
      user:{ id:u._id, userName:u.userName, email:u.email, isAdmin:!!u.isAdmin }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success:false, message:"Server error" });
  }
}

// POST /api/auth/login
async function loginUser(req, res) {
  try {
    const { email, userName, password } = req.body;
    if (!email && !userName)
      return res.status(400).json({ success:false, message:"Email or userName required" });

    const user = await User.findOne(email ? { email } : { userName });
    if (!user) return res.status(400).json({ success:false, message:"Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ success:false, message:"Invalid credentials" });

    const token = jwt.sign({ id:user._id, isAdmin:!!user.isAdmin }, JWT_SECRET, { expiresIn:"7d" });

    return res
      .cookie("token", token, {
        httpOnly:true, sameSite:"lax", secure:false, maxAge:7*24*3600*1000
      })
      .json({
        success:true,
        user:{ id:user._id, email:user.email, userName:user.userName, isAdmin:!!user.isAdmin }
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success:false, message:"Server error" });
  }
}

// POST /api/auth/logout
function logoutUser(_req, res) {
  res.clearCookie("token", { httpOnly:true, sameSite:"lax", secure:false });
  res.json({ success:true });
}

// Middleware for GET /api/auth/check-auth
function authMiddleware(req, res, next) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ success:false, message:"Not authenticated" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id, isAdmin: !!decoded.isAdmin };
    next();
  } catch {
    return res.status(401).json({ success:false, message:"Invalid token" });
  }
}

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };