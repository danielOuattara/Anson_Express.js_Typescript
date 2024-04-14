import { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import { users } from "../data";

//---------------
// http://localhost:3000/api/v1/users?filter=name&value=na
export const getAllUsers: RequestHandler<{}, {}, {}, IReqQuery> = (
  req,
  res,
) => {
  const filter = req.query.filter;
  const value = req.query.value;

  if (filter && value) {
    const newUsers = users.filter((user) => user[filter].includes(value));
    return res.send(newUsers);
  }
  return res.send(users);
};

//---------------
export const getAllUsersTest: RequestHandler = (req, res) => {
  const filter = req.queryTest?.filter;
  const value = req.queryTest?.value;

  if (filter && value) {
    const newUsers = users.filter((user) => user[filter].includes(value));
    return res.send(newUsers);
  }
  return res.send(users);
};

//---------------
export const getOneUser: RequestHandler = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  if (isNaN(userId)) {
    return res
      .status(400)
      .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
  }

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).send({ msg: "User Not Found." });
  }
  return res.send(user);
};

//---------------
export const updateUser: RequestHandler = (req, res) => {
  const result = validationResult(req);
  // handle error from validator
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const validatedData = matchedData(req) as IPutUserValidatedData;

  users[req.userIndex!] = {
    id: req.userId!,
    email: users[req.userIndex!].email,
    password: users[req.userIndex!].password,
    ...validatedData,
  };
  return res.status(200).send(users);
};

//---------------
export const patchUser: RequestHandler = (req, res) => {
  const result = validationResult(req);
  // handle error from validator
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }
  const validatedData = matchedData(req) as IPatchUserValidatedData;

  users[req.userIndex!] = { ...users[req.userId!], ...validatedData };
  return res.status(200).send(users);
};

//---------------
export const deleteUser: RequestHandler = (req, res) => {
  users.splice(req.userIndex!, 1);
  return res.status(200).send(users);
};
