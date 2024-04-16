import { Router } from "express";
import { addToCart, getCart } from "../handlers/cartHandler";

const router = Router();

router.post("/", addToCart);
router.get("/", getCart);

export default router;
