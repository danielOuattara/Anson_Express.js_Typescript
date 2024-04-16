"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRoutes_1 = __importDefault(require("./productRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const authRouter_1 = __importDefault(require("./authRouter"));
const cartRouter_1 = __importDefault(require("./cartRouter"));
const router = (0, express_1.Router)();
router.use("/api/v1/auth", authRouter_1.default);
router.use("/api/v1/users", userRoutes_1.default);
router.use("/api/v1/products", productRoutes_1.default);
router.use("/api/v1/cart", cartRouter_1.default);
exports.default = router;
