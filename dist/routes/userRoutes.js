"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersHandler_1 = require("../handlers/usersHandler");
const router = (0, express_1.Router)();
router.get("/", usersHandler_1.getUsers);
router.get("/:userId", usersHandler_1.getUserById);
exports.default = router;
