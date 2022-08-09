"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Logging {
    static log = (args) => this.info(args);
    static info = (args) => console.log(chalk_1.default.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === 'string' ? chalk_1.default.blueBright(args) : args);
    static warning = (args) => console.log(chalk_1.default.yellow(`[${new Date().toLocaleString()}] [WARN]`), typeof args === 'string' ? chalk_1.default.yellowBright(args) : args);
    static error = (args) => console.log(chalk_1.default.red(`[${new Date().toLocaleString()}] [ERROR]`), typeof args === 'string' ? chalk_1.default.redBright(args) : args);
}
exports.default = Logging;
