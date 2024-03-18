import { RequestHandler, Request, Response } from "express";

export const getUserById: RequestHandler = (_req, res) => {
  res.send("One user ");
};

export function getUsers(_req: Request, res: Response) {
  res.send("User List");
}

export function createUser(
  _req: Request<{}, {}, IUserRequest, IQParams>,
  res: Response<IUserResponse>,
) {
  // console.log(req.body.email);
  // req.query.loginUponCreated = false;
  res.send({ email: "email@user.com", id: "1", username: "John Doe" });
}
