declare namespace Express {
  interface User extends IUser {
    _id: Types.ObjectId;
  }
}
