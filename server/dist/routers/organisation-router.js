"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services/");
const organisationRouter = express_1.Router();
organisationRouter.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { name } = req.body;
    let results = yield services_1.organisationService.createOrganisation(name);
    res.send(results);
}));
organisationRouter.get('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let results = yield services_1.organisationService.getOrganisations();
    res.send(results);
}));
exports.default = organisationRouter;
//# sourceMappingURL=organisation-router.js.map