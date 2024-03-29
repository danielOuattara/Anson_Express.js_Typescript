"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from "express";
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validationSchema_js_1 = require("./utilities/validationSchema.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//--------------- Data
const users = [
    { id: 1, name: "John Doe", username: "johnD", email: "johndoe@email.com" },
    { id: 2, name: "Anna Smith", username: "an88na", email: "annaanna@email.uk" },
    {
        id: 3,
        name: "Bob Tyson",
        username: "micky_mouse",
        email: "mtstrong@jaguar.us",
    },
];
const products = [
    { id: 1, name: "cheese" },
    { id: 2, name: "eggs" },
    { id: 3, name: "milk" },
];
//----------------  Middlewares definition
const loginMiddleware = (req, _res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};
const resolveUserIndex = (req, res, next) => {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
        return res
            .status(400)
            .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
    }
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).send({ msg: "User Not Found." });
    }
    req.userIndex = userIndex;
    req.userId = userId;
    next();
};
/** ------------- middleware parsing incoming json data in req.body */
app.use(express_1.default.json());
// Middleware
// --------------- // Apply middleware on the entire APP
app.use(loginMiddleware);
//------------------ CRUD operations
// http://localhost:3000/api/v1/users?filter=name&value=na
app.get("/", (_req, res) => {
    //   return res.send("Hello World, Welcome !");
    //   return res.json({ message: "Hello World, Welcome !" });
    //   return res.status(200).send("Hello World, Welcome !");
    return res.status(201).json({ message: "Hello World, Welcome !" });
});
//---------------
app.get("/api/v1/products", (_req, _res, next) => {
    console.log("Logging Products");
    next();
}, (_req, res, _next) => {
    return res.json({ products });
});
app.get("/api/v1/users", (0, express_validator_1.query)("filter")
    .notEmpty()
    .withMessage("No empty filter")
    .isString()
    .withMessage("filter must be string")
    .isLength({ min: 3, max: 12 })
    .withMessage("filter min-length: 3 &  max-length: 12"), (req, res) => {
    console.log("req = ", req);
    // console.log("req = ", req["express-validator#contexts"]);
    const result = (0, express_validator_1.validationResult)(req);
    console.log("result = ", result);
    console.log("result.array() = ", result.array());
    const filter = req.query.filter;
    const value = req.query.value;
    if (filter && value) {
        const newUsers = users.filter((user) => user[filter].includes(value));
        return res.send(newUsers);
    }
    return res.send(users);
});
app.get("/api/v1/users-test", (req, res) => {
    var _a, _b;
    console.log("req = ", req);
    const filter = (_a = req.queryTest) === null || _a === void 0 ? void 0 : _a.filter;
    const value = (_b = req.queryTest) === null || _b === void 0 ? void 0 : _b.value;
    if (filter && value) {
        const newUsers = users.filter((user) => user[filter].includes(value));
        return res.send(newUsers);
    }
    return res.send(users);
});
//------------------
app.get("/api/v1/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
        return res
            .status(400)
            .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
    }
    const user = users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).send({ msg: "User Not Found." });
    }
    return res.send(user);
});
//------------------ body validation and messages
app.post("/api/v1/users/", (0, express_validator_1.body)(["name", "email", "password"])
    .notEmpty()
    .withMessage("name, email & password cannot be empty"), (0, express_validator_1.body)(["name"])
    .isString()
    .withMessage("name must be string")
    .isLength({ min: 2, max: 20 })
    .withMessage("name min-length: 2 &  max-length: 12"), (0, express_validator_1.body)(["email"]).isEmail().withMessage("email must be valid"), (0, express_validator_1.body)("password")
    .isStrongPassword({
    minLength: 6,
    minLowercase: 2,
    minUppercase: 2,
    minNumbers: 2,
    returnScore: true,
})
    .withMessage("password is not strong: ")
    .isLength({ min: 6 })
    .withMessage("password min-length: 6 characters"), (0, express_validator_1.body)("username")
    .isString()
    .withMessage("username must be a string")
    .notEmpty()
    .withMessage("username cannot be empty"), // Ensure username is not empty
(req, res) => {
    // console.log("req = ", req["express-validator#contexts"]);
    const result = (0, express_validator_1.validationResult)(req);
    // console.log("result = ", result);
    // console.log("result.array() = ", result.array());
    // handle error
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const validatedData = (0, express_validator_1.matchedData)(req);
    const newUser = Object.assign({ id: new Date().getTime() }, validatedData);
    users.push(newUser);
    return res.status(201).json({ message: "post OK", users });
});
//------------------ validation using an external schema
app.put("/api/v1/users/:userId", (0, express_validator_1.checkSchema)(validationSchema_js_1.putUserValidationSchema), resolveUserIndex, (req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    // handle error from validator
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const validatedData = (0, express_validator_1.matchedData)(req);
    users[req.userIndex] = Object.assign({ id: req.userId, email: users[req.userIndex].email }, validatedData);
    return res.status(200).send(users);
});
//------------------
app.patch("/api/v1/users/:userId", (0, express_validator_1.checkSchema)(validationSchema_js_1.patchUserValidationSchema), resolveUserIndex, (req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    // handle error from validator
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const validatedData = (0, express_validator_1.matchedData)(req);
    users[req.userIndex] = Object.assign(Object.assign({}, users[req.userId]), validatedData);
    return res.status(200).send(users);
});
//------------------
app.delete("/api/v1/users/:userId", resolveUserIndex, (req, res) => {
    users.splice(req.userIndex, 1);
    return res.status(200).send(users);
});
//------------------
app.use((_req, _res, next) => {
    console.log("End of logic");
    next();
});
//------------------
app.listen(PORT, () => console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`));
