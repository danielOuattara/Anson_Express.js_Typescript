"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const users = [
    { id: 1, name: "Johna Doe", username: "johnD" },
    { id: 2, name: "Anna Smith", username: "an88na" },
    { id: 3, name: "Mike Tyson", username: "micky_mouse" },
];
const products = [
    { id: 1, name: "cheese" },
    { id: 2, name: "eggs" },
    { id: 3, name: "milk" },
];
/** middleware parsing incoming json data in req.body */
app.use(express_1.default.json());
//-------------------------------------------------------------------------
// http://localhost:3000/api/v1/users?filter=name&value=na
app.get("/", (_req, res) => {
    //   return res.send("Hello World, Welcome !");
    //   return res.json({ message: "Hello World, Welcome !" });
    //   return res.status(200).send("Hello World, Welcome !");
    return res.status(201).json({ message: "Hello World, Welcome !" });
});
//-------------------------------------------------------------------------
app.get("/api/v1/users", (req, res) => {
    const filter = req.query.filter;
    const value = req.query.value;
    if (filter && value) {
        const newUsers = users.filter((user) => user[filter].includes(value));
        return res.send(newUsers);
    }
    return res.send(users);
});
//-------------------------------------------------------------------------
app.get("/api/v1/products", (_req, res) => {
    return res.json({ products });
});
//-------------------------------------------------------------------------
app.get("/api/v1/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
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
//-------------------------------------------------------------------------
app.post("/api/v1/users/", (req, res) => {
    console;
    const newUser = Object.assign({ id: new Date().getTime() }, req.body);
    users.push(newUser);
    return res.status(201).json({ message: "post OK", users });
});
//-------------------------------------------------------------------------
app.put("/api/v1/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res
            .status(400)
            .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
    }
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).send({ msg: "User Not Found." });
    }
    users[userIndex] = Object.assign({ id: userId }, req.body);
    return res.send(users);
});
//-------------------------------------------------------------------------
app.patch("/api/v1/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res
            .status(400)
            .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
    }
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).send({ msg: "User Not Found." });
    }
    users[userIndex] = Object.assign(Object.assign({}, users[userIndex]), req.body);
    return res.send(users);
});
//-------------------------------------------------------------------------
app.delete("/api/v1/users/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
        return res
            .status(400)
            .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
    }
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).send({ msg: "User Not Found." });
    }
    users.splice(userIndex, 1);
    return res.status(200).send(users);
});
//-------------------------------------------------------------------------
app.listen(PORT, () => console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`));
