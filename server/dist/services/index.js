"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const azure_storage_1 = require("azure-storage");
const client_1 = __importDefault(require("./client"));
const organisation_service_1 = __importDefault(require("./organisation-service"));
const client = new azure_storage_1.TableService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);
const organisationClient = new client_1.default(client, 'organisation');
exports.organisationService = new organisation_service_1.default(organisationClient);
//# sourceMappingURL=index.js.map