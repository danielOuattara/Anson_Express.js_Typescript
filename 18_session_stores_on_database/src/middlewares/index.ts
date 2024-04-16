import { RequestHandler } from "express";

//----------------  Middlewares definition
const loginMiddleware: RequestHandler = (req, _res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

export { loginMiddleware };
