import { RequestHandler } from "express";

export const productMiddleware: RequestHandler = (_req, _res, next) => {
  console.log("Logging Products");
  next();
};
