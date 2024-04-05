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
const data_1 = require("./data");
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
app.use(express_1.default.json());
app.use(index_js_1.loginMiddleware);
app.use(index_1.default);
//----------
app.get("/", (req, res) => {
    req.session.visited = true;
    return res.status(201).json({ message: "Hello World, Welcome !" });
});
//----------
app.post("/api/v1/auth", (req, res) => {
    const user = data_1.users.find((user) => user.username === req.body.username &&
        user.password === req.body.password);
    if (!user) {
        return res.status(401).json({
            message: `Bad Credentials, please try again OR sign in and then log in`,
        });
    }
    req.session.user = user;
    console.log("req.session = ", req.session);
    console.log("-----------------------");
    res.status(200).send(user);
});
//----------
app.get("/api/v1/auth/status", (req, res) => {
    req.sessionStore.get(req.sessionID, (err, sessionData) => {
        if (err)
            return console.log(err);
        console.log("sessionData = ", sessionData);
        console.log("-----------------------");
    });
    return req.session.user
        ? res.status(200).send(req.sessionID)
        : res.status(401).send(`Not Authenticated`);
});
//----------
app.post("/api/v1/cart", (req, res) => {
    console.log(req.body);
    if (!req.session.user)
        return res.sendStatus(401);
    if (req.session.cart && req.session.cart.length !== 0) {
        req.session.cart.push(req.body);
    }
    else {
        req.session.cart = [req.body];
    }
    console.log("req.session = ", req.session);
    return res.status(201).send(req.body);
});
//----------
app.get("/api/v1/cart", (req, res) => {
    var _a;
    if (!req.session.user)
        return res.sendStatus(401);
    return res.status(200).send((_a = req.session.cart) !== null && _a !== void 0 ? _a : []);
});
//----------
app.listen(PORT, () => console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`));
