import passport from "passport";
import { Strategy } from "passport-local";
import User from "../mongoose/schema/user.schema";
import { Types } from "mongoose";

//-------

export default passport.use(
  new Strategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ username });
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
      done(error, false);
    }
  }),
);

//--------------------------

passport.serializeUser((user, done) => {
  done(null, user._id);
});

//--------------------------

passport.deserializeUser(async function (id: Types.ObjectId, done) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

//-----------------------------------------------------------------

/**
 * By default the instance from `new Strategy()` accept a function
 * which expect `username` & `password` as default credentials for
 * local strategy.
 *
 * However, one can use `email` instead of `username` as specified
 * below
 */

// export default passport.use(
//   new Strategy({ usernameField: "email" }, function (email, password, done) {
//     try {
//       console.log("email = ", email);
//       console.log("password = ", password);
//       const user = users.find((user) => user.email === email);
//       if (!user) {
//         throw new Error("User not found");
//       }
//       if (user.password !== password) {
//         throw new Error("Invalid credentials");
//       }
//       // all OK !
//       return done(null, user);
//     } catch (error) {
//       console.log(error);
//       done(error, false);
//     }
//   }),
// );
