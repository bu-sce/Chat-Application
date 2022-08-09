"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAll = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt = require('bcrypt');
const readUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await userModel_1.default.findOne({ username });
        if (!user)
            return res.json({ msg: 'Incorrect Username or Password', status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({ msg: 'Incorrect Username or Password', status: false });
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (ex) {
        next(ex);
    }
};
const createUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const usernamecheck = await userModel_1.default.findOne({ username: username });
        if (usernamecheck) {
            return res.json({ msg: 'Username is already used.', status: false });
        }
        const emailcheck = await userModel_1.default.findOne({ email: email });
        if (emailcheck) {
            return res.json({ msg: 'Email is already used.', status: false });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        // const user = new User();
        // user.username = username;
        // user.email = email;
        // user.password = hashedpassword;
        const user = await userModel_1.default.create({ username, email, password: hashedpassword });
        await user.save();
        delete user.password;
        res.json({ status: true, user: user });
    }
    catch (ex) {
        next(ex);
    }
};
const readAll = async (req, res, next) => {
    try {
        const users = await userModel_1.default.find({ _id: { $ne: req.params.id } }).select(['email', 'username', 'avatarImage', '_id']);
        return res.json(users);
    }
    catch (ex) {
        next(ex);
    }
};
exports.readAll = readAll;
// module.exports.setAvatar = async (req : Request, res : Response, next : NextFunction) => {
//   try {
//     const userId = req.params.id;
//     const avatarImage = req.body.image;
//     const userData = await User.findByIdAndUpdate(
//       userId,
//       {
//         isAvatarImageSet: true,
//         avatarImage,
//       },
//       { new: true }
//     );
//     return res.json({
//       isSet: userData.isAvatarImageSet,
//       image: userData.avatarImage,
//     });
//   } catch (ex) {
//     next(ex);
//   }
// };
// module.exports.logOut = (req : Request, res : Response, next : NextFunction) => {
//   try {
//     if (!req.params.id) return res.json({ msg: "User id is required " });
//     onlineUsers.delete(req.params.id);
//     return res.status(200).send();
//   } catch (ex) {
//     next(ex);
//   }
// };
exports.default = { createUser, readUser, readAll: exports.readAll }; //, readAuthor, readAll, updateAuthor, deleteAuthor };
