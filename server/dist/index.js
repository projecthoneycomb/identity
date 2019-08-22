"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const helmet_1 = __importDefault(require("helmet"));
const logging_1 = require("./helpers/logging");
// Loading the .env variable into the node process.
dotenv_1.config();
const port = process.env.PORT;
// Loading app insights to start capturing logs
logging_1.start();
const app = express_1.default();
app.use(helmet_1.default());
app.listen(port, () => console.log(`Identity server is running on port: ${port}`));
//# sourceMappingURL=index.js.map