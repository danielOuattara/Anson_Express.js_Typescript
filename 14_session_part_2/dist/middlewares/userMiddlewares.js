"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserUsernameValidation = exports.createUserPasswordValidation = exports.createUserEmailValidation = exports.createUserNameValidation = exports.createUserBodyValidation = exports.userFilterMiddleware = exports.resolveUserIndex = void 0;
const data_1 = require("../data");
const express_validator_1 = require("express-validator");
//-------
const resolveUserIndex = (req, res, next) => {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
        return res
            .status(400)
            .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
    }
    const userIndex = data_1.users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).send({ msg: "User Not Found." });
    }
    req.userIndex = userIndex;
    req.userId = userId;
    next();
};
exports.resolveUserIndex = resolveUserIndex;
//-------
exports.userFilterMiddleware = (0, express_validator_1.query)("filter")
    .notEmpty()
    .withMessage("No empty filter")
    .isString()
    .withMessage("filter must be string")
    .isLength({ min: 3, max: 12 })
    .withMessage("filter min-length: 3 &  max-length: 12");
//-------
exports.createUserBodyValidation = (0, express_validator_1.body)(["name", "email", "password"])
    .notEmpty()
    .withMessage("name, email & password cannot be empty");
//-------
exports.createUserNameValidation = (0, express_validator_1.body)(["name"])
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
//-------
exports.createUserUsernameValidation = (0, express_validator_1.body)(["username"])
    .isString()
    .withMessage("username must be string")
    .isLength({ min: 2, max: 20 })
    .withMessage("username min-length: 2 &  max-length: 12");
