import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  deleteUser,
  getAllUsers,
  getAllUsersTest,
  getOneUser,
  patchUser,
  updateUser,
} from "../handlers/userHandlers";
import {
  createUserBodyValidation,
  createUserEmailValidation,
  createUserNameValidation,
  createUserPasswordValidation,
  createUserUsernameValidation,
  resolveUserIndex,
  userFilterMiddleware,
} from "../middlewares/userMiddlewares";
import {
  patchUserValidationSchema,
  putUserValidationSchema,
} from "../utilities/validationSchema";

const router = Router();

router.get("/", userFilterMiddleware, getAllUsers);
router.get("/users-test", getAllUsersTest); // no middleware

//------------------
router.get("/:userId", getOneUser);

//------------------ body validation and messages
router.post(
  "/",
  createUserBodyValidation,
  createUserNameValidation,
  createUserEmailValidation,
  createUserPasswordValidation,
  createUserUsernameValidation,
);

//------------------ validation using an external schema
router.put(
  "/:userId",
  checkSchema(putUserValidationSchema),
  resolveUserIndex,
  updateUser,
);

//------------------
router.patch(
  "/:userId",
  patchUser,
  checkSchema(patchUserValidationSchema),
  resolveUserIndex,
);

//------------------
router.delete("/:userId", resolveUserIndex, deleteUser);

export default router;
