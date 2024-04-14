"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.status = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const index_js_1 = require("../data/index.js");
//-----------------
const register = (req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const userExists = index_js_1.users.find((user) => user.email === req.body.email);
    if (userExists) {
        return res
            .status(400)
            .send(`Duplicate email for ${req.body.email}. Please choose another email and try again`);
    }
    const validatedData = (0, express_validator_1.matchedData)(req);
    const newUser = Object.assign({ id: new Date().getTime() }, validatedData);
    index_js_1.users.push(newUser);
    return res.status(201).json({ message: "post OK", users: index_js_1.users });
};
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
