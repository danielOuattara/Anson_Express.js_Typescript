import express from "express";
import appRouter from "./router/index";
import { loginMiddleware } from "./middlewares/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./passport/local-strategy.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser("secured-cookie"));

app.use(
  session({
    secret: "Session_Secret_string", //
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 3600, // 1 hour
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(loginMiddleware);
app.use(appRouter);

//----------
app.get("/", (req, res) => {
  req.session.visited = true;
  return res.status(201).json({ message: "Hello World, Welcome !" });
});

//----------
app.listen(PORT, () =>
  console.log(`Running on port ${PORT}\nhttp://localhost:${PORT}`),
);
