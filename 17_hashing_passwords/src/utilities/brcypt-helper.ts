import { genSalt, hash, compare } from "bcrypt";

export const passwordHashed = async (plainText: string): Promise<string> => {
  const salt = await genSalt(10);
  return await hash(plainText, salt);
};

export const isPasswordOK = async (
  password: string,
  encrypted: string,
): Promise<boolean> => {
  return await compare(password, encrypted);
};
