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
exports.isAuthorized = void 0;
const authHelpers_1 = require("../utils/authHelpers");
const errorHandlers_1 = __importDefault(require("../utils/errorHandlers"));
const isAuthorized = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearer = request.headers.authorization;
        if (!bearer) {
            response.status(401).json({
                status: 'error',
                message: 'An error occurred.',
                error: {
                    code: 401,
                    details: 'You are not authorized to access this page!',
                },
            });
            return;
        }
        const token = bearer.split(' ')[1];
        if (!token) {
            response.status(400).json({
                status: 'error',
                message: 'An error occurred.',
                error: {
                    code: 400,
                    details: 'Invalid token',
                },
            });
            return;
        }
        try {
            const user = yield (0, authHelpers_1.verifyJWT)(token);
            if (user) {
                request.user = user; // Type assertion if `user` property isn't defined in `Request`
                next();
            }
            else {
                response.status(400).json({
                    status: 'error',
                    message: 'An error occurred.',
                    error: {
                        code: 400,
                        details: 'Invalid token',
                    },
                });
            }
        }
        catch (error) {
            response.status(400).json({
                status: 'error',
                message: 'An error occurred.',
                error: {
                    code: 400,
                    details: 'Invalid token',
                },
            });
        }
    }
    catch (error) {
        (0, errorHandlers_1.default)(response, error);
    }
});
exports.isAuthorized = isAuthorized;
