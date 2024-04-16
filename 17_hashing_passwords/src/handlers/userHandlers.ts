import { matchedData, validationResult } from "express-validator";
import User from "../mongoose/schema/user.schema";
import { RequestHandler } from "express";
import { IReqQuery } from "../@types/user";

//---------------
// http://localhost:3000/api/v1/users?filter=name&value=na
interface IQueryObject {
  [key: string]: string | number | { $regex: string; $options: string };
}

export const getAllUsers: RequestHandler<{}, {}, {}, IReqQuery> = async (
  req,
  res,
) => {
  const { filter, value } = req.query;
  const queryObject: IQueryObject = {};

  if (filter && value) {
    queryObject[filter] = { $regex: value, $options: "i" };
  }
  const users = await User.find(queryObject);
  return res.send(users);
};

//---------------
export const getOneUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({ msg: "User Not Found." });
    }
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

//---------------
export const updateUser: RequestHandler = async (req, res) => {
  const result = validationResult(req);
  // handle error from validator
  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  const validatedData = matchedData(req) as IPutUserValidatedData;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { ...validatedData },
      { new: true, runValidators: true },
    );

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

//---------------
export const patchUser: RequestHandler = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};

//---------------
export const deleteUser: RequestHandler = async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
  return res.status(200).send(`user ${req.params.userId} deleted successfully`);
};
