import { RequestHandler } from "express";
import { products } from "../data";

export const getAllProducts: RequestHandler = (_req, res, _next) => {
  return res.json({ products });
};
