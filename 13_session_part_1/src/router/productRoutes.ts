import { Router } from "express";
import { getAllProducts } from "../handlers/productHandlers";

const router = Router();

router.get("/", getAllProducts);

export default router;
