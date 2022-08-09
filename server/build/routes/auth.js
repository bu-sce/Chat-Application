"use strict";
//  const {
//     login,
//     register,
//     getAllUsers,
//     setAvatar,
//     logOut,
//   } = require("../controllers/userController");
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
// const authController = require('../controllers/userController')
const router = require("express").Router();
router.post("/login", userController_1.login);
router.post("/register", userController_1.register);
router.get("/allusers/:id", userController_1.getAllUsers);
// router.post("/setavatar/:id", setAvatar);
//router.get("/logout/:id", logOut);
module.exports = router;
//  export {router};
