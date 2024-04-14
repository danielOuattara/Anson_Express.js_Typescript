import { Router } from "express";
import { getAllProducts, getOneProduct } from "../handlers/productHandlers";

const router = Router();

router.get("/", getAllProducts);
router.get("/:productId", getOneProduct);

export default router;
