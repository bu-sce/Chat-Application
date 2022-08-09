"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logging_1 = __importDefault(require("../library/Logging"));
function ErrorHandler(req, res, next) {
    const error = new Error('Not found');
    Logging_1.default.error(error);
    res.status(404).json({
        message: error.message
    });
    next();
}
exports.default = ErrorHandler;
