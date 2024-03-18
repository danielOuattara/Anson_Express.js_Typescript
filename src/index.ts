import express /*,  { NextFunction, Request, Response } */ from "express";
import userRouter from "./routes/userRoutes";

const app = express();

const PORT = 3000;

app.use("/api/users", userRouter);

/*  OK */
// app.get("/", (req, res, next) => {
//   res.send("Welcome Users ");
// });

/*  OK */
// app.get("/", (req: Request, res: Response, next: NextFunction) => {
//   res.send("Welcome Users");
// });

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}\n http://localhost:${PORT} `),
);
