"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagesController_1 = __importDefault(require("../controllers/messagesController"));
const router = express_1.default.Router();
router.post('/addmsg', messagesController_1.default.addMessage);
router.post('/getmsg', messagesController_1.default.getAllMessage);
exports.default = router;
