interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface IReqQuery {
  filter?: "name" | "username";
  value?: string;
}
