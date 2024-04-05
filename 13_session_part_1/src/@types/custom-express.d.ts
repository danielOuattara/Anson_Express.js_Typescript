declare namespace Express {
  interface Request {
    userIndex?: number;
    userId?: number;
    session: {
      visited: boolean;
    };

    queryTest?: {
      value: string;
      filter: "name" | "username";
    };
  }
}
