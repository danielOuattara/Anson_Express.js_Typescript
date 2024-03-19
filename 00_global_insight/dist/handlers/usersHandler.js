"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
function getUsers(_req, res) {
    res.send("User List");
}
exports.getUsers = getUsers;
const getUserById = (_req, res) => {
    res.send("One user ");
};
exports.getUserById = getUserById;
function createUser(req, res) {
    console.log(req.body.email); // string
    req.query.loginUponCreated = false; // boolean
    res.send({ email: "email@user.com", id: "1", username: "John Doe" });
}
exports.createUser = createUser;
const updateUser = (req, res) => {
    req.url; // string | undefined
    /**
     * Request interface extension using custom types
     */
    req.customField; // string | undefined
    /**
     * Request interface extension with express-session package types
     */
    req.session;
    req.sessionID;
    /**
     * Request interface extension with passport package types
     */
    req.logOut;
    req.isAuthenticated;
    /**
     * Response
     */
    res.send("One user ");
};
exports.updateUser = updateUser;
