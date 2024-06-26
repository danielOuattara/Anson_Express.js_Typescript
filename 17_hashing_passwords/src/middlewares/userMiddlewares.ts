import { body, query } from "express-validator";

//-------
export const userFilterMiddleware = query("filter")
  .notEmpty()
  .withMessage("No empty filter")
  .isString()
  .withMessage("filter must be string")
  .isLength({ min: 3, max: 12 })
  .withMessage("filter min-length: 3 &  max-length: 12");

//-------
export const createUserBodyValidation = body([
  "name",
  "email",
  "username",
  "password",
])
  .notEmpty()
  .withMessage("name, email, username & password cannot be empty");

//-------
export const createUserNameValidation = body(["name"])
  .isString()
  .withMessage("name must be string")
  .isLength({ min: 2, max: 20 })
  .withMessage("name min-length: 2 &  max-length: 12");

//-------
export const createUserUserNameValidation = body(["username"])
  .isString()
  .withMessage("name must be string")
  .isLength({ min: 2, max: 20 })
  .withMessage("name min-length: 2 &  max-length: 12");

//-------
export const createUserEmailValidation = body(["email"])
  .isEmail()
  .withMessage("email must be valid");

//-------
export const createUserPasswordValidation = body("password")
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
