"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const data_1 = require("../data");
const getAllProducts = (_req, res, _next) => {
    return res.json({ products: data_1.products });
};
exports.getAllProducts = getAllProducts;
