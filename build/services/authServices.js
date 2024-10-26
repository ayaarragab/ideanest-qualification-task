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
exports.refreshAccessToken = exports.signinUser = exports.signupUser = void 0;
const authHelpers_1 = require("../utils/authHelpers");
const user_1 = __importDefault(require("../models/user"));
const signupUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = userData;
        const hashedPassword = yield (0, authHelpers_1.hashPassword)(password);
        try {
            const isExist = yield user_1.default.findOne({ email });
            if (isExist) {
                return 'Email already exists';
            }
            const newUser = yield user_1.default.create({ name, email, password: hashedPassword });
            const access_token = (0, authHelpers_1.createJWT)({ id: String(newUser._id), email: newUser.email }, "access", "15m");
            const refresh_token = (0, authHelpers_1.createJWT)({ id: String(newUser._id), email: newUser.email }, "refresh", "7d");
            // redis
        }
        catch (error) {
            return false;
        }
    }
    catch (error) {
        return false;
    }
});
exports.signupUser = signupUser;
const signinUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = yield (0, authHelpers_1.comparePasswords)(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const access_token = (0, authHelpers_1.createJWT)({ id: String(user._id), email: user.email }, "access", "15m");
    const refresh_token = (0, authHelpers_1.createJWT)({ id: String(user._id), email: user.email }, "refresh", "7d");
    return { user, access_token, refresh_token };
});
exports.signinUser = signinUser;
const refreshAccessToken = (refresh_token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = (0, authHelpers_1.verifyRefreshToken)(refresh_token);
        const accessToken = (0, authHelpers_1.createJWT)({ id: decoded.id, email: decoded.email }, "access", "15m");
        const newRefreshToken = (0, authHelpers_1.createJWT)({ id: decoded.id, email: decoded.email }, "refresh", "7d");
        return { accessToken, newRefreshToken };
    }
    catch (error) {
        return { accessToken: "", newRefreshToken: "" };
    }
});
exports.refreshAccessToken = refreshAccessToken;
