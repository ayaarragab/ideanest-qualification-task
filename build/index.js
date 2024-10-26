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
const express_1 = __importDefault(require("express"));
const process_1 = __importDefault(require("process"));
const dbClient_1 = require("./config/dbClient");
const routes_1 = require("./routes/routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process_1.default.env.PORT;
app.use('/api', routes_1.router);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbClient_1.connectToDatabase)();
    console.log(`Hello on port ${PORT}`);
}));
