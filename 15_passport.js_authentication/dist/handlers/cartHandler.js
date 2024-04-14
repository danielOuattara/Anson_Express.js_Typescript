"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = exports.addToCart = void 0;
//----------
const addToCart = (req, res) => {
    if (!req.user || req.user.id !== req.session.passport.user) {
        return res.sendStatus(401);
    }
    if (req.session.cart) {
        req.session.cart.push(req.body);
    }
    else {
        req.session.cart = [req.body];
    }
    return res.status(201).send(req.body);
};
exports.addToCart = addToCart;
//----------
const getCart = (req, res) => {
    var _a;
    if (req.user && req.user.id !== req.session.passport.user) {
        return res.sendStatus(401);
    }
    return res.status(200).send((_a = req.session.cart) !== null && _a !== void 0 ? _a : []);
};
exports.getCart = getCart;
