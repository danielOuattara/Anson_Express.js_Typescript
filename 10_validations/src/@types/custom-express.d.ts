declare namespace Express {
  interface Request {
    userIndex?: number;
    userId?: number;

    queryTest?: {
      value: string;
      filter: "name" | "username";
    };
  }
}
