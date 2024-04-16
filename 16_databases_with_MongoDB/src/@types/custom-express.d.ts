import { Types } from "mongoose";
import { IUser, TMongooseUser } from "./user";

declare module "express-serve-static-core" {
  interface Request {
    user?: TMongooseUser;
    session: {
      visited: boolean;
      // user?: IUser;
      user?: TMongooseUser;
      cart?: IProduct[];
      passport: {
        [key: string]: string | number;
      };
    };

    queryTest?: {
      value: string;
      filter: "name" | "username";
    };
  }
}
