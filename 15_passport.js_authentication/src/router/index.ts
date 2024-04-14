import { Router } from "express";
import productRouter from "./productRoutes";
import userRouter from "./userRoutes";
import authRouter from "./authRouter";
import cartRouter from "./cartRouter";

const router = Router();

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/products", productRouter);
router.use("/api/v1/cart", cartRouter);

export default router;
