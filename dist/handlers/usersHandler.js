"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUserById = void 0;
const getUserById = (_req, res) => {
    res.send("One user ");
};
exports.getUserById = getUserById;
function getUsers(_req, res) {
    res.send("User List");
}
exports.getUsers = getUsers;
