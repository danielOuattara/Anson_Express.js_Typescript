import express, { NextFunction, Request, Response } from "express";
import userRouter from "./routes/userRoutes";

export function createApp() {
  const app = express();
  app.use("/api/users", userRouter);

  app.get("/", (_req: Request, res: Response, _next: NextFunction) => {
    res.send("Welcome Users");
  });

  return app;
}
