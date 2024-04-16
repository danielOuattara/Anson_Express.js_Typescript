import { Types } from "mongoose";
import { IUser, TMongooseUser } from "./user";

declare module "express-serve-static-core" {
  interface Request {
    user?: TMongooseUser;
    session: {
      visited: boolean;
      user?: TMongooseUser;
      cart?: IProduct[];
      passport: {
        [key: string]: string | number;
      };
      sessionID: string;
      id: string;
    };

    queryTest?: {
      value: string;
      filter: "name" | "username";
    };
  }
}
