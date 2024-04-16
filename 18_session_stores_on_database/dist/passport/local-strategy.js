"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_schema_1 = __importDefault(require("../mongoose/schema/user.schema"));
const brcypt_helper_1 = require("../utilities/brcypt-helper");
//-------
exports.default = passport_1.default.use(new passport_local_1.Strategy(function (username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_schema_1.default.findOne({ username });
            if (!user) {
                throw new Error("User not found");
            }
            if (!(yield (0, brcypt_helper_1.isPasswordOK)(password, user.password))) {
                throw new Error("Invalid credentials");
            }
            // all OK !
            return done(null, user);
        }
        catch (error) {
            console.log(error);
            done(error, false);
        }
    });
}));
//--------------------------
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
//--------------------------
passport_1.default.deserializeUser(function (id, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_schema_1.default.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            done(null, user);
        }
        catch (error) {
            done(error, false);
        }
    });
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
