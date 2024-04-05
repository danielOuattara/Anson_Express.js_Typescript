"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./router/index"));
const index_js_1 = require("./middlewares/index.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)("secured-cookie"));
app.use(express_1.default.json());
app.use(index_js_1.loginMiddleware);
app.use(index_1.default);
app.get("/", (_req, res) => {
    // 5min lifetime cookie
    res.cookie("my-cookie", "my-cookie content", { maxAge: 60000 * 3 }); // 3min lifetime
    res.cookie("my-secured-cookie", "my-secured-cookie content", {
        maxAge: 60000 * 3,
        signed: true,
    }); // 3min lifetime
    return res.status(201).json({ message: "Hello World, Welcome !" });
});
app.listen(PORT, () => console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`));
