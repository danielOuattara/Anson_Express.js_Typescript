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
exports.getCart = exports.addToCart = void 0;
const user_schema_1 = __importDefault(require("../mongoose/schema/user.schema"));
//----------
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || req.user._id.toString() !== req.session.passport.user) {
        return res.sendStatus(401);
    }
    //---> add to `cart` in session
    if (req.session.cart) {
        req.session.cart.push(req.body);
    }
    else {
        req.session.cart = [req.body];
    }
    //---> add to cart in user.cart in DB
    try {
        const user = yield user_schema_1.default.findById(req.user._id);
        user.cart.push(req.body);
        yield user.save();
        return res.status(201).send(req.body);
    }
    catch (error) {
        console.log(error);
        res.send({ error });
    }
    return res.status(201).send(req.body);
});
exports.addToCart = addToCart;
//----------
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.user && req.user._id.toString() !== req.session.passport.user) {
        return res.sendStatus(401);
    }
    const user = yield user_schema_1.default.findById(req.session.passport.user);
    return res.status(200).send({
        "req.session.cart = ": (_a = req.session.cart) !== null && _a !== void 0 ? _a : [],
        "user.cart = ": user.cart,
    });
});
exports.getCart = getCart;
