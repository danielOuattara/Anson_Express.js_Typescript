"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProduct = exports.getAllProducts = void 0;
const data_1 = require("../data");
//-------------------
const getAllProducts = (req, res) => {
    if (!req.user || req.user.id !== req.session.passport.user) {
        return res.status(401).send("Customer is not identified !");
    }
    return res.status(200).json({ products: data_1.products });
};
exports.getAllProducts = getAllProducts;
//--------------------
const getOneProduct = (req, res) => {
    if (!req.user || req.user.id !== req.session.passport.user) {
        return res.status(401).send("Customer is not identified !");
    }
    const product = data_1.products.find((product) => product.id === parseInt(req.params.productId, 10));
    if (!product) {
        return res
            .status(400)
            .send(`No product found with id ${req.params.productId} `);
    }
    return res.json({ product });
};
exports.getOneProduct = getOneProduct;
