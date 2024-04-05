import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../data/index.js";

export default passport.use(
  new Strategy(function (username, password, done) {
    try {
      console.log("username = ", username);
      console.log("password = ", password);
      const user = users.find((user) => user.username === username);
      if (!user) {
        throw new Error("User not found");
      }
      if (user.password !== password) {
        throw new Error("Invalid credentials");
      }
      // all OK !
      return done(null, user);
    } catch (error) {
      console.log(error);
      done(error);
    }
  }),
);
