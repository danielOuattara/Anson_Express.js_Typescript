import { RequestHandler, Request, Response } from "express";

export function getUsers(_req: Request, res: Response) {
  res.send("User List");
}

export const getUserById: RequestHandler = (_req, res) => {
  res.send("One user ");
};

export function createUser(
  req: Request<{}, {}, ICreateUserRequest, ICreateUserQueryParams>,
  res: Response<ICreateUserResponse>,
) {
  console.log(req.body.email); // string
  req.query.loginUponCreated = false; // boolean
  res.send({ email: "email@user.com", id: "1", username: "John Doe" });
}
