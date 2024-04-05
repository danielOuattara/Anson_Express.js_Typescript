"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productHandlers_1 = require("../handlers/productHandlers");
const router = (0, express_1.Router)();
router.get("/", productHandlers_1.getAllProducts);
exports.default = router;
