interface IRegisterUserValidatedData {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface IPutUserValidatedData {
  name: string;
  username: string;
}

interface IPatchUserValidatedData {
  name?: string;
  username?: string;
}
