"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartHandler_1 = require("../handlers/cartHandler");
const router = (0, express_1.Router)();
router.post("/", cartHandler_1.addToCart);
router.get("/", cartHandler_1.getCart);
exports.default = router;
