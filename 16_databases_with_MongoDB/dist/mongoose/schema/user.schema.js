"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const product_schema_js_1 = require("./product.schema.js");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: [product_schema_js_1.productSchema],
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
