"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authHandler_1 = require("../handlers/authHandler");
const passport_1 = __importDefault(require("passport"));
require("./../passport/local-strategy");
const userMiddlewares_js_1 = require("../middlewares/userMiddlewares.js");
const router = (0, express_1.Router)();
router.get("/status", authHandler_1.status);
router.post("/register", [
    userMiddlewares_js_1.createUserBodyValidation,
    userMiddlewares_js_1.createUserNameValidation,
    userMiddlewares_js_1.createUserEmailValidation,
    userMiddlewares_js_1.createUserPasswordValidation,
], authHandler_1.register);
router.post("/login", passport_1.default.authenticate("local"), authHandler_1.login);
router.post("/logout", authHandler_1.logout);
exports.default = router;
