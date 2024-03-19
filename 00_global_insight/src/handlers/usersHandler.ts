import { RequestHandler, Request, Response } from "express";

export function getUsers(_req: Request, res: Response) {
  res.send([]);
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

export const updateUser: RequestHandler = (req, res) => {
  req.url; // string | undefined

  /**
   * Request interface extension using custom types
   */
  req.customField; // string | undefined

  /**
   * Request interface extension with express-session package types
   */
  req.session;
  req.sessionID;

  /**
   * Request interface extension with passport package types
   */
  req.logOut;
  req.isAuthenticated;

  /**
   * Response
   */
  res.send("One user ");
};
