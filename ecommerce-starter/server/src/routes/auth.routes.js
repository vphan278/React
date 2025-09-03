
import { Router } from "express";
import { register, login, me, logout } from "../controllers/auth.controller.js";
import auth from "../middleware/auth.js";
const r = Router();
r.post("/register", register);
r.post("/login", login);
r.get("/me", auth, me);
r.post("/logout", auth, logout);
export default r;
