import { Document, Types } from "mongoose";

interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  cart: Types.DocumentArray<{
    name: string;
    price: number;
  }>;
}

interface IReqQuery {
  filter?: "name" | "username";
  value?: string;
}

type TMongooseUser =
  | (Document<unknown, {}, IUser> &
      IUser & {
        _id: Types.ObjectId;
      })
  | null;
