"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const index_js_1 = require("../data/index.js");
//-------
passport_1.default.serializeUser((user, done) => {
    console.log(`\n\n\nInside Serialize User`);
    console.log(user);
    done(null, user);
});
//-------
passport_1.default.deserializeUser((id, done) => {
    console.log(`\n\n\nInside Deserialize User ID : ${id}`);
    try {
        const user = index_js_1.users.find((user) => user.id === id);
        if (!user) {
            throw new Error("User not found");
        }
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
});
//-------
exports.default = passport_1.default.use(new passport_local_1.Strategy(function (username, password, done) {
    try {
        console.log("username = ", username);
        console.log("password = ", password);
        const user = index_js_1.users.find((user) => user.username === username);
        if (!user) {
            throw new Error("User not found");
        }
        if (user.password !== password) {
            throw new Error("Invalid credentials");
        }
        // all OK !
        return done(null, user);
    }
    catch (error) {
        console.log(error);
        done(error);
    }
}));
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
