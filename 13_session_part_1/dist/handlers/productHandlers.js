"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const data_1 = require("../data");
const getAllProducts = (req, res, _next) => {
    // console.log("req = ", req);
    console.log("req.headers.cookie = ", req.headers.cookie); // return no parsed cookies
    console.log("req.cookies = ", req.cookies); // parsed by 'cookie-parser'
    console.log("req.signedCookies = ", req.signedCookies); // parsed by 'cookie-parser'
    if (req.cookies["my-cookie"] === "my-cookie content") {
        return res.json({ products: data_1.products });
    }
    return res.status(401).send("Customer is not identified !");
};
exports.getAllProducts = getAllProducts;
