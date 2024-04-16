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
exports.getOneProduct = exports.getAllProducts = exports.addProduct = void 0;
const express_validator_1 = require("express-validator");
const product_schema_1 = __importDefault(require("../mongoose/schema/product.schema"));
//--------------------
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || req.user._id.toString() !== req.session.passport.user) {
        return res.status(401).send("Customer is not identified !");
    }
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }
    const validatedData = (0, express_validator_1.matchedData)(req);
    const newProduct = new product_schema_1.default(Object.assign({}, validatedData));
    try {
        yield newProduct.save();
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
    return res.status(201).json({ message: "post OK", newProduct });
});
exports.addProduct = addProduct;
//-------------------
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || req.user._id.toString() !== req.session.passport.user) {
        return res.status(401).send("Customer is not identified !");
    }
    const products = yield product_schema_1.default.find();
    return res.status(200).json({ products });
});
exports.getAllProducts = getAllProducts;
//--------------------
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || req.user._id.toString() !== req.session.passport.user) {
        return res.status(401).send("Customer is not identified !");
    }
    const product = yield product_schema_1.default.findById(req.params.productId);
    if (!product) {
        return res
            .status(400)
            .send(`No product found with id ${req.params.productId} `);
    }
    return res.json({ product });
});
exports.getOneProduct = getOneProduct;
