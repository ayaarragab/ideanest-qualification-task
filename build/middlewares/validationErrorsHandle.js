"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orgExists = exports.emailExists = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const organization_1 = __importDefault(require("../models/organization"));
const handleValidationErrors = (request, response, next) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        response.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
const emailExists = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExist = yield user_1.default.findOne({ email: request.body.email });
        if (isExist) {
            response.status(400).json({ message: 'Email already exists!' });
            return;
        }
        next();
    }
    catch (error) {
        console.error(error);
    }
});
exports.emailExists = emailExists;
const orgExists = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExist = yield organization_1.default.findOne({ name: request.body.name, description: request.body.description });
        if (isExist) {
            response.status(400).json({ message: 'Organization already exists!' });
            return;
        }
        next();
    }
    catch (error) {
        console.error(error);
    }
});
exports.orgExists = orgExists;
