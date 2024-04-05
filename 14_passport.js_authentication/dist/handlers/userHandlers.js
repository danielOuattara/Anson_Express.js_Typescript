"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.patchUser = exports.updateUser = exports.createUser = exports.getOneUser = exports.getAllUsersTest = exports.getAllUsers = void 0;
const express_validator_1 = require("express-validator");
const data_1 = require("../data");
//---------------
// http://localhost:3000/api/v1/users?filter=name&value=na
const getAllUsers = (req, res) => {
    console.log("-----------------------");
    console.log("req.sessionID = ", req.sessionID);
    console.log("-----------------------");
    console.log("req.session = ", req.session);
    console.log("-----------------------");
    req.sessionStore.get(req.sessionID, (err, data) => {
        if (err)
            return console.log(err);
        console.log("sessionData = ", data);
        console.log("-----------------------");
    });
    const filter = req.query.filter;
    const value = req.query.value;
    if (filter && value) {
        const newUsers = data_1.users.filter((user) => user[filter].includes(value));
        return res.send(newUsers);
    }
    return res.send(data_1.users);
};
exports.getAllUsers = getAllUsers;
//---------------
const getAllUsersTest = (req, res) => {
    var _a, _b;
    const filter = (_a = req.queryTest) === null || _a === void 0 ? void 0 : _a.filter;
    const value = (_b = req.queryTest) === null || _b === void 0 ? void 0 : _b.value;
    if (filter && value) {
        const newUsers = data_1.users.filter((user) => user[filter].includes(value));
        return res.send(newUsers);
    }
    return res.send(data_1.users);
};
exports.getAllUsersTest = getAllUsersTest;
//---------------
const getOneUser = (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
        return res
            .status(400)
            .send({ msg: "Bad Request. Invalid ID, expect a numeric ID" });
    }
    const user = data_1.users.find((user) => user.id === userId);
    if (!user) {
        return res.status(404).send({ msg: "User Not Found." });
    }
    return res.send(user);
};
exports.getOneUser = getOneUser;
//---------------
const createUser = (req, res) => {
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
    data_1.users.push(newUser);
    return res.status(201).json({ message: "post OK", users: data_1.users });
};
exports.createUser = createUser;
//---------------
const updateUser = (req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    // handle error from validator
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const validatedData = (0, express_validator_1.matchedData)(req);
    data_1.users[req.userIndex] = Object.assign({ id: req.userId, email: data_1.users[req.userIndex].email, password: data_1.users[req.userIndex].password }, validatedData);
    return res.status(200).send(data_1.users);
};
exports.updateUser = updateUser;
//---------------
const patchUser = (req, res) => {
    const result = (0, express_validator_1.validationResult)(req);
    // handle error from validator
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const validatedData = (0, express_validator_1.matchedData)(req);
    data_1.users[req.userIndex] = Object.assign(Object.assign({}, data_1.users[req.userId]), validatedData);
    return res.status(200).send(data_1.users);
};
exports.patchUser = patchUser;
//---------------
const deleteUser = (req, res) => {
    data_1.users.splice(req.userIndex, 1);
    return res.status(200).send(data_1.users);
};
exports.deleteUser = deleteUser;
