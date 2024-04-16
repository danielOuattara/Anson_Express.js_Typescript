"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productHandlers_1 = require("../handlers/productHandlers");
const productMiddlewares_1 = require("../middlewares/productMiddlewares");
const router = (0, express_1.Router)();
router.post("/add", [
    productMiddlewares_1.addProductBodyValidation,
    productMiddlewares_1.addProductNameValidation,
    productMiddlewares_1.addProductPriceValidation,
], productHandlers_1.addProduct);
router.get("/", productHandlers_1.getAllProducts);
router.get("/:productId", productHandlers_1.getOneProduct);
exports.default = router;
