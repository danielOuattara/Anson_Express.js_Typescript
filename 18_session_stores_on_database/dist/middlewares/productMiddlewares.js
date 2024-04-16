"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductPriceValidation = exports.addProductNameValidation = exports.addProductBodyValidation = exports.productMiddleware = void 0;
const express_validator_1 = require("express-validator");
const productMiddleware = (_req, _res, next) => {
    console.log("Logging Products");
    next();
};
exports.productMiddleware = productMiddleware;
//-------
exports.addProductBodyValidation = (0, express_validator_1.body)(["name", "price"])
    .notEmpty()
    .withMessage("name & price cannot be empty");
//-------
exports.addProductNameValidation = (0, express_validator_1.body)(["name"])
    .isString()
    .withMessage("name must be string")
    .isLength({ min: 2, max: 20 })
    .withMessage("name min-length: 2 &  max-length: 12");
//-------
exports.addProductPriceValidation = (0, express_validator_1.body)(["price"])
    .isNumeric()
    .withMessage("price must be string")
    .isLength({ min: 0 })
    .withMessage("username min-length: 2 &  max-length: 12");
