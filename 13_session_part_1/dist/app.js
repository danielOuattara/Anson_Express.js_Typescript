"use strict";
/**
 * 1/
 * In this course Anson artificially alters the session object
 * in the app.js, at `app.get('/', ...)`, so that when he makes
 * a request using tools like `thunder client` or `postman`,
 * the output of `console.log(req.sessionID)` will always be
 * the same on any request.
 *
 * But the game is totally different on a real Browser: there;
 * developers don't have to do anything on the session object
 * and the sessionID value will remain the same.
 *
 *
 * 2/
 * According to the present configuration of `express-sesson`,
 * there is a sessionStore, that is store on memory, but on
 * volatile memory. So all session data are lost on tension out.
 * One need to store the sessionStore on file or on database,
 * locally or remotely. This is the core of the next part of
 * the course about session
 * */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./router/index"));
const index_js_1 = require("./middlewares/index.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
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
app.get("/", (req, res) => {
    req.session.visited = true;
    // 5min lifetime cookie
    res.cookie("my-cookie", "my-cookie content", { maxAge: 60000 * 5 }); // 3min lifetime
    // 3min lifetime cookie
    res.cookie("my-secured-cookie", "my-secured-cookie content", {
        maxAge: 60000 * 3,
        signed: true,
    }); // 3min lifetime
    // console.log(req.session);
    // console.log("-------------------");
    console.log(req.sessionID);
    // console.log("-------------------");
    req.session.visited = true;
    return res.status(201).json({ message: "Hello World, Welcome !" });
});
app.listen(PORT, () => console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`));
