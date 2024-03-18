"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
// app.use(express.json());
app.use("/api/users", userRoutes_1.default);
/*  OK */
// app.get("/", (req, res, next) => {
//   res.send("Welcome Users ");
// });
/*  OK */
app.get("/", (_req, res, _next) => {
    res.send("Welcome Users");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}\n http://localhost:${PORT} `));
