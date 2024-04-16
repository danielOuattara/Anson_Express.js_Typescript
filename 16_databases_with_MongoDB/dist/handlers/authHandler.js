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
exports.logout = exports.status = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const user_schema_js_1 = __importDefault(require("../mongoose/schema/user.schema.js"));
//-----------------
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    // handle express-validation error
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const validatedData = (0, express_validator_1.matchedData)(req);
    const newUser = new user_schema_js_1.default(Object.assign({}, validatedData));
    try {
        yield newUser.save();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
    return res.status(201).json({ message: "post OK", newUser });
});
exports.register = register;
//-----------------
const login = (req, res) => {
    console.log(`\n-->Inside /api/v1/auth`);
    console.log("\nreq.user = ", req.user);
    console.log("\nreq.session = ", req.session);
    console.log("-----------------------");
    res.status(200).send("Login Success");
};
exports.login = login;
//-----------------
const status = (req, res) => {
    console.log(`\n-->Inside /api/v1/auth/status`);
    console.log("\nreq.user = ", req.user);
    console.log("\nreq.session = ", req.session);
    return req.user
        ? res.status(200).send(req.user)
        : res.status(401).send(`Not Authenticated`);
};
exports.status = status;
//--------------------
const logout = (req, res) => {
    if (!req.user)
        return res.sendStatus(401);
    req.logout(function (err) {
        if (err)
            return res.sendStatus(400);
        res.sendStatus(200);
    });
};
exports.logout = logout;
