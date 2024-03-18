import { Router } from "express";
import { createUser, getUserById, getUsers } from "../handlers/usersHandler";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);

export default router;
