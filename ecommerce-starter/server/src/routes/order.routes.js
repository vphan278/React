
import { Router } from "express";
import auth from "../middleware/auth.js";
import { createOrder, myOrders } from "../controllers/order.controller.js";
const r = Router();
r.post("/", auth, createOrder);
r.get("/mine", auth, myOrders);
export default r;
