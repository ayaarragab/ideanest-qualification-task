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
exports.refreshTokenrequest = exports.signin = exports.signup = void 0;
const authServices_1 = require("../services/authServices");
const errorHandlers_1 = __importDefault(require("../utils/errorHandlers"));
const signup = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authServices_1.signupUser)(request.body);
        response.status(200).json({ message: `You've signed up successfully` });
    }
    catch (error) {
        (0, errorHandlers_1.default)(response, error);
    }
});
exports.signup = signup;
const signin = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, access_token, refresh_token } = yield (0, authServices_1.signinUser)(request.body);
        response.status(200).json({ message: `You've signed in successfully`, access_token, refresh_token });
    }
    catch (error) {
        (0, errorHandlers_1.default)(response, error);
    }
});
exports.signin = signin;
const refreshTokenrequest = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, newRefreshToken } = yield (0, authServices_1.refreshAccessToken)(request.body.refresh_token);
    if (accessToken && newRefreshToken) {
        response.status(200).json({
            message: `Here's your new tokens`,
            access_token: accessToken,
            refresh_token: newRefreshToken
        });
    }
});
exports.refreshTokenrequest = refreshTokenrequest;
