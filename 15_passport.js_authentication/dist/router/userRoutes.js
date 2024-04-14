"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validationSchema_js_1 = require("./../utilities/validationSchema.js");
const userHandlers_js_1 = require("../handlers/userHandlers.js");
const userMiddlewares_js_1 = require("../middlewares/userMiddlewares.js");
const router = (0, express_1.Router)();
router.get("/", userHandlers_js_1.getAllUsers);
router.get("/:userId", userHandlers_js_1.getOneUser);
router.put("/:userId", (0, express_validator_1.checkSchema)(validationSchema_js_1.putUserValidationSchema), userMiddlewares_js_1.resolveUserIndex, userHandlers_js_1.updateUser);
router.patch("/:userId", userMiddlewares_js_1.resolveUserIndex, userHandlers_js_1.patchUser);
router.delete("/:userId", userMiddlewares_js_1.resolveUserIndex, userHandlers_js_1.deleteUser);
exports.default = router;
