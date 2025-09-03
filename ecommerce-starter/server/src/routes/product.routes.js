
import { Router } from "express";
import auth from "../middleware/auth.js";
import { list, getOne, create, update, remove } from "../controllers/product.controller.js";
const r = Router();
r.get("/", list);
r.get("/:id", getOne);
r.post("/", auth, create);
r.put("/:id", auth, update);
r.delete("/:id", auth, remove);
export default r;
