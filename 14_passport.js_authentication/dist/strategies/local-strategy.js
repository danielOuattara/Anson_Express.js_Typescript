"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const index_js_1 = require("../data/index.js");
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
