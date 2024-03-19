"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = exports.getUserById = void 0;
const getUserById = (_req, res) => {
    res.send("One user ");
};
exports.getUserById = getUserById;
function getUsers(_req, res) {
    res.send("User List");
}
exports.getUsers = getUsers;
function createUser(_req, res) {
    // console.log(req.body.email);
    // req.query.loginUponCreated = false;
    res.send({ email: "email@user.com", id: "1", username: "John Doe" });
}
exports.createUser = createUser;
