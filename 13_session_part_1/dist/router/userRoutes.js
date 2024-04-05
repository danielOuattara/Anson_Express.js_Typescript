"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const userHandlers_1 = require("../handlers/userHandlers");
const userMiddlewares_1 = require("../middlewares/userMiddlewares");
const validationSchema_1 = require("../utilities/validationSchema");
const router = (0, express_1.Router)();
router.get("/", userMiddlewares_1.userFilterMiddleware, userHandlers_1.getAllUsers);
router.get("/users-test", userHandlers_1.getAllUsersTest); // no middleware
//------------------
router.get("/:userId", userHandlers_1.getOneUser);
//------------------ body validation and messages
router.post("/", userMiddlewares_1.createUserBodyValidation, userMiddlewares_1.createUserNameValidation, userMiddlewares_1.createUserEmailValidation, userMiddlewares_1.createUserPasswordValidation, userMiddlewares_1.createUserUsernameValidation);
//------------------ validation using an external schema
router.put("/:userId", (0, express_validator_1.checkSchema)(validationSchema_1.putUserValidationSchema), userMiddlewares_1.resolveUserIndex, userHandlers_1.updateUser);
//------------------
router.patch("/:userId", userHandlers_1.patchUser, (0, express_validator_1.checkSchema)(validationSchema_1.patchUserValidationSchema), userMiddlewares_1.resolveUserIndex);
//------------------
router.delete("/:userId", userMiddlewares_1.resolveUserIndex, userHandlers_1.deleteUser);
exports.default = router;
