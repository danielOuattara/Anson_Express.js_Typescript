"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./router/index"));
const index_js_1 = require("./middlewares/index.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
require("./passport/local-strategy.js");
const mongoose_1 = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)("secured-cookie"));
app.use((0, express_session_1.default)({
    secret: "Session_Secret_string", //
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 3600, // 1 hour
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.json());
app.use(index_js_1.loginMiddleware);
app.use(index_1.default);
//----------
app.get("/", (req, res) => {
    req.session.visited = true;
    return res.status(201).json({ message: "Hello World, Welcome !" });
});
//----------
app.listen(PORT, () => console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`));
(0, mongoose_1.connect)("mongodb://127.0.0.1:27017/anson-express-course")
    .then(() => console.log(`Connection Succeeded to anson-express-course database `))
    .catch((err) => {
    console.error(err);
});
