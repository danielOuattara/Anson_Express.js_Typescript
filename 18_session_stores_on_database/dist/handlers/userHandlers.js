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
exports.deleteUser = exports.patchUser = exports.updateUser = exports.getOneUser = exports.getAllUsers = void 0;
const express_validator_1 = require("express-validator");
const user_schema_1 = __importDefault(require("../mongoose/schema/user.schema"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //---
    console.log("req.sessionID = ", req.sessionID);
    req.sessionStore.get(req.session.id, (err, data) => {
        if (err)
            return console.log(err);
        console.log("\nsessionData = ", data);
        console.log("-----------------------");
    });
    //---
    const { filter, value } = req.query;
    const queryObject = {};
    if (filter && value) {
        queryObject[filter] = { $regex: value, $options: "i" };
    }
    const users = yield user_schema_1.default.find(queryObject);
    return res.send(users);
});
exports.getAllUsers = getAllUsers;
//---------------
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.default.findById(req.params.userId);
        if (!user) {
            return res.status(404).send({ msg: "User Not Found." });
        }
        return res.status(200).send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});
exports.getOneUser = getOneUser;
//---------------
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    // handle error from validator
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const validatedData = (0, express_validator_1.matchedData)(req);
    try {
        const user = yield user_schema_1.default.findByIdAndUpdate(req.params.userId, Object.assign({}, validatedData), { new: true, runValidators: true });
        return res.status(200).send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});
exports.updateUser = updateUser;
//---------------
const patchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.default.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true,
        });
        return res.status(200).send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});
exports.patchUser = patchUser;
//---------------
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_schema_1.default.findByIdAndDelete(req.params.userId);
    return res.status(200).send(`user ${req.params.userId} deleted successfully`);
});
exports.deleteUser = deleteUser;
