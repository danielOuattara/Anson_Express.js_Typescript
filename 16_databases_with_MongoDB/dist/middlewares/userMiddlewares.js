"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserPasswordValidation = exports.createUserEmailValidation = exports.createUserUserNameValidation = exports.createUserNameValidation = exports.createUserBodyValidation = exports.userFilterMiddleware = void 0;
const express_validator_1 = require("express-validator");
//-------
exports.userFilterMiddleware = (0, express_validator_1.query)("filter")
    .notEmpty()
    .withMessage("No empty filter")
    .isString()
    .withMessage("filter must be string")
    .isLength({ min: 3, max: 12 })
    .withMessage("filter min-length: 3 &  max-length: 12");
//-------
exports.createUserBodyValidation = (0, express_validator_1.body)([
    "name",
    "email",
    "username",
    "password",
])
    .notEmpty()
    .withMessage("name, email, username & password cannot be empty");
//-------
exports.createUserNameValidation = (0, express_validator_1.body)(["name"])
    .isString()
    .withMessage("name must be string")
    .isLength({ min: 2, max: 20 })
    .withMessage("name min-length: 2 &  max-length: 12");
//-------
exports.createUserUserNameValidation = (0, express_validator_1.body)(["username"])
    .isString()
    .withMessage("name must be string")
    .isLength({ min: 2, max: 20 })
    .withMessage("name min-length: 2 &  max-length: 12");
//-------
exports.createUserEmailValidation = (0, express_validator_1.body)(["email"])
    .isEmail()
    .withMessage("email must be valid");
//-------
exports.createUserPasswordValidation = (0, express_validator_1.body)("password")
    .isStrongPassword({
    minLength: 6,
    minLowercase: 2,
    minUppercase: 2,
    minNumbers: 2,
    returnScore: true,
})
    .withMessage("password is not strong: ")
    .isLength({ min: 6 })
    .withMessage("password min-length: 6 characters");
