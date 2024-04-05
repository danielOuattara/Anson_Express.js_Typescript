"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMiddleware = void 0;
//----------------  Middlewares definition
const loginMiddleware = (req, _res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};
exports.loginMiddleware = loginMiddleware;
