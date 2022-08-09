"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_USERNAME = process.env.MONGO_USERNAME;
const DB_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.amnqdvu.mongodb.net/`;
const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;
exports.config = {
    mongo: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};
//module.exports = config;
