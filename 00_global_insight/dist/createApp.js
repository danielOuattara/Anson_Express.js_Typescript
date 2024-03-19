"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
function createApp() {
    const app = (0, express_1.default)();
    app.use("/api/users", userRoutes_1.default);
    app.get("/", (_req, res, _next) => {
        res.send("Welcome Users");
    });
    return app;
}
exports.createApp = createApp;
