import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getOneProduct,
} from "../handlers/productHandlers";
import {
  addProductBodyValidation,
  addProductNameValidation,
  addProductPriceValidation,
} from "../middlewares/productMiddlewares";

const router = Router();

router.post(
  "/add",
  [
    addProductBodyValidation,
    addProductNameValidation,
    addProductPriceValidation,
  ],
  addProduct,
);
router.get("/", getAllProducts);
router.get("/:productId", getOneProduct);

export default router;
