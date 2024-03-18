import { RequestHandler, Request, Response } from "express";

export const getUserById: RequestHandler = (_req, res) => {
  res.send("One user ");
};

export function getUsers(_req: Request, res: Response) {
  res.send("User List");
}
