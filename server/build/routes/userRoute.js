"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.post('/login', userController_1.default.readUser);
router.post('/register', userController_1.default.createUser);
router.get('/allusers/:id', userController_1.default.readAll);
//router.get("/logout/:id", logOut);
exports.default = router;
