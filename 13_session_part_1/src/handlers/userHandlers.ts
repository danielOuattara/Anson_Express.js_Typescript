import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { users } from "../data";

//---------------
// http://localhost:3000/api/v1/users?filter=name&value=na
export const getAllUsers = (
  req: Request<{}, {}, {}, IReqQuery>,
  res: Response,
) => {
  console.log("-----------------------");
  console.log("req.sessionID = ", req.sessionID);
  console.log("-----------------------");
  console.log("req.session = ", req.session);
  console.log("-----------------------");
  req.sessionStore.get(req.sessionID, (err, data) => {
    if (err) return console.log(err);
    console.log("sessionData = ", data);
    console.log("-----------------------");
  });

  const filter = req.query.filter;
  const value = req.query.value;

  if (filter && value) {
    const newUsers = users.filter((user) => user[filter].includes(value));
    return res.send(newUsers);
  }
  return res.send(users);
};

//---------------
export const getAllUsersTest = (req: Request, res: Response) => {
  const filter = req.queryTest?.filter;
  const value = req.queryTest?.value;

  if (filter && value) {
    const newUsers = users.filter((user) => user[filter].includes(value));
    return res.send(newUsers);
  }
  return res.send(users);
};

//---------------
export const getOneUser = (req: Request, res: Response) => {
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
export const createUser = (req: Request, res: Response) => {
  // console.log("req = ", req["express-validator#contexts"]);
  const result = validationResult(req);
  // console.log("result = ", result);
  // console.log("result.array() = ", result.array());

  // handle error
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const validatedData = matchedData(req) as IPostUserValidatedData;

  const newUser = { id: new Date().getTime(), ...validatedData };
  users.push(newUser);
  return res.status(201).json({ message: "post OK", users });
};

//---------------
export const updateUser = (req: Request, res: Response) => {
  const result = validationResult(req);
  // handle error from validator
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const validatedData = matchedData(req) as IPutUserValidatedData;

  users[req.userIndex!] = {
    id: req.userId!,
    email: users[req.userIndex!].email,
    ...validatedData,
  };
  return res.status(200).send(users);
};

//---------------
export const patchUser = (req: Request, res: Response) => {
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
export const deleteUser = (req: Request, res: Response) => {
  users.splice(req.userIndex!, 1);
  return res.status(200).send(users);
};
