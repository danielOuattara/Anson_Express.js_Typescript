"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productMiddleware = void 0;
const productMiddleware = (_req, _res, next) => {
    console.log("Logging Products");
    next();
};
exports.productMiddleware = productMiddleware;
