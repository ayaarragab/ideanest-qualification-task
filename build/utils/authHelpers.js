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
exports.verifyRefreshToken = exports.comparePasswords = exports.hashPassword = exports.verifyJWT = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const process_1 = __importDefault(require("process"));
const JWT_SECRET = '621e5e9893db6a9a1a7da3ca0f3352750d8439b79d694859dcf274d7140ab8443a69ca6712b3d004d80ba72dd5e691f52bd97364cf8b2eb5795ae1cc31db1c17';
const REFRESH_TOKEN_SECRET = process_1.default.env.REFRESH_TOKEN_SECRET || "d84ff23021e9155dfbe1b8a87a579a5b481589723cdd49c0d27ce828c83034966b79b9221b69aa8296d556b24c9a20f2fdd3ed4363d28f50e166c728daf41a67";
const createJWT = (user, accessOrRefresh, expiresIn) => {
    if (accessOrRefresh == 'access') {
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn });
        return token;
    }
    else if (accessOrRefresh == 'refresh') {
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, { expiresIn });
        return token;
    }
};
exports.createJWT = createJWT;
const verifyJWT = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userJWT = jsonwebtoken_1.default.verify(token, process_1.default.env.JWT_SECRET || JWT_SECRET);
        if (typeof userJWT !== 'string' && userJWT.id) {
            try {
                const user = yield user_1.default.findById(userJWT.id);
                if (user)
                    return user;
            }
            catch (error) {
                console.log('user not found');
                return false;
            }
        }
    }
    catch (error) {
        console.log('unknown token not found');
        return false;
    }
});
exports.verifyJWT = verifyJWT;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 5);
});
exports.hashPassword = hashPassword;
const comparePasswords = (passwordPlain, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(passwordPlain, hashedPassword);
});
exports.comparePasswords = comparePasswords;
const verifyRefreshToken = (refresh_token) => {
    if (!refresh_token) {
        throw new Error("Refresh token is required");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refresh_token, REFRESH_TOKEN_SECRET);
        return decoded;
    }
    catch (error) {
        throw new Error("Invalid or expired refresh token");
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
