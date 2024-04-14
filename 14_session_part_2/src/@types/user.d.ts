interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
}

interface IReqQuery {
  filter?: "name" | "username";
  value?: string;
}
