"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Loading the .env variable into the node process.
const dotenv_1 = require("dotenv");
dotenv_1.config();
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = require("body-parser");
const logging_1 = require("./helpers/logging");
const organisation_router_1 = __importDefault(require("./routers/organisation-router"));
const port = process.env.PORT;
// Loading app insights to start capturing logs
logging_1.start();
const app = express_1.default();
app.use(helmet_1.default());
app.use(body_parser_1.json());
app.use('/organisations', organisation_router_1.default);
app.listen(port, () => console.log(`Identity server is running on port: ${port}`));
//# sourceMappingURL=index.js.map