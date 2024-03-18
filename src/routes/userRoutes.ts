import { Router } from "express";
import { getUserById, getUsers } from "../handlers/usersHandler";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);

export default router;
