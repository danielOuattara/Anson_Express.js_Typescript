"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3300;
const users = [
    { id: 1, name: "John Doe", username: "johnD" },
    { id: 2, name: "Anna Smith", username: "an88na" },
    { id: 3, name: "Mike Tyson", username: "micky_mouse" },
];
const products = [
    { id: 1, name: "cheese" },
    { id: 2, name: "eggs" },
    { id: 3, name: "milk" },
];
app.get("/", (_req, res) => {
    //   res.send("Hello World, Welcome !");
    //   res.json({ message: "Hello World, Welcome !" });
    return res.status(200).send("Hello World, Welcome !");
    //   res.status(201).json({ message: "Hello World, Welcome !" });
});
app.get("/api/v1/users", (_req, res) => {
    return res.send(users);
});
app.get("/api/v1/products", (_req, res) => {
    return res.json({ products });
});
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
app.listen(PORT, () => console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`));
