declare namespace Express {
  interface Request {
    userIndex?: number;
    userId?: number;
    session: {
      visited: boolean;
      user?: IUser;
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
  interface User extends IUser {}
}
