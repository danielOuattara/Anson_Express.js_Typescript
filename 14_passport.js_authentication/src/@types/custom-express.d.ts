declare namespace Express {
  interface Request {
    userIndex?: number;
    userId?: number;
    session: {
      visited: boolean;
      user?: IUser;
      cart?: IProduct[];
    };

    queryTest?: {
      value: string;
      filter: "name" | "username";
    };
  }
}
