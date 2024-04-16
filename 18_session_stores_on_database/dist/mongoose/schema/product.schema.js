"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
const Product = (0, mongoose_1.model)("Product", exports.productSchema);
exports.default = Product;
