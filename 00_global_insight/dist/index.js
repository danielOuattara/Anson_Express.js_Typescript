"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createApp_1 = require("./createApp");
const app = (0, createApp_1.createApp)();
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}\n http://localhost:${PORT} `));
