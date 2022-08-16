const bcrypt = require('bcrypt');
const crypto = require("crypto");
import console from 'console';
import { Request, Response, NextFunction } from 'express';

import User from '../models/userModel';
import sendEmail from '../config/sendEmail'

const readUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.json({ msg: 'Incorrect Username or Password', status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.json({ msg: 'Incorrect Username or Password', status: false });
    delete user.password;

    const obj = JSON.stringify(user);

    const jsonData = JSON.parse(obj);

    const data = { '_id': jsonData._id, 'username': jsonData.username, 'isAvatarImageSet': jsonData.isAvatarImageSet, 'avatarImage': jsonData.avatarImage }

    return res.json({ status: true, user: data }); //, token : 'secretTokenForAuthentication'

  } catch (ex) {
    next(ex);
  }
};


const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const usernamecheck = await User.findOne({ username: username });
    if (usernamecheck) {
      return res.json({ msg: 'Username is already used.', status: false });
    }
    const emailcheck = await User.findOne({ email: email });
    if (emailcheck) {
      return res.json({ msg: 'Email is already used.', status: false });
    }
    // const hashedpassword = await bcrypt.hash(password, 10);

    // const user = new User();
    // user.username = username;
    // user.email = email;
    // user.password = hashedpassword;
    const user = await User.create({ username, email, password });
    await user.save();
    delete user.password;

    const obj = JSON.stringify(user);
    const jsonData = JSON.parse(obj);

    const data = { '_id': jsonData._id, 'username': jsonData.username, 'isAvatarImageSet': jsonData.isAvatarImageSet, 'avatarImage': jsonData.avatarImage }

    return res.json({ status: true, user: data });
  } catch (ex) {
    next(ex);
  }
};

const googleRegistration = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, sub } = req.body;
  const password = Math.random().toString(36).slice(-10);

  try {
    const usernamecheck = await User.findOne({ username: username });
    if (usernamecheck) {
      return res.json({ msg: 'Your Email Username is already used.', status: false });
    }
    const emailcheck = await User.findOne({ email: email });
    if (emailcheck) {
      return res.json({ msg: 'Email is already used.', status: false });
    }

    const user = await User.create({ username, email, password, googleID: sub });
    await user.save();
    delete user.password;

    const obj = JSON.stringify(user);
    const jsonData = JSON.parse(obj);

    const data = { '_id': jsonData._id, 'username': jsonData.username, 'isAvatarImageSet': jsonData.isAvatarImageSet, 'avatarImage': jsonData.avatarImage }


    return res.json({ status: true, user: data });
  } catch (ex) {
    next(ex);
  }

};

const googleLogIn = async (req: Request, res: Response, next: NextFunction) => {
  const { sub } = req.body;
  try {
  const user = await User.findOne({ googleID: sub });
    if (!user) return res.json({ msg: 'You are not registered with this google Account.', status: false });
   
    const obj = JSON.stringify(user);
    const jsonData = JSON.parse(obj);

    const data = { '_id': jsonData._id, 'username': jsonData.username, 'isAvatarImageSet': jsonData.isAvatarImageSet, 'avatarImage': jsonData.avatarImage }

    return res.json({ status: true, user: data }); 
  } catch (ex) {
    next(ex);
  }
};


export const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select(['email', 'username', 'avatarImage', '_id']);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

const setAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData: any = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,

    });
  } catch (ex) {
    next(ex);
  }

};

const logOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);

    // Is refreshToken in header?
    //   const refreshTokenHeader : any = req.headers['authorization'];
    //   if(!refreshTokenHeader) return res.status(401).send("authorization header is requied");

    // Is refreshToken in DB?
    //   const authTokenHeader = refreshTokenHeader.split(" ")[1]
    //   const foundUserToLogout = await User.findOne({ refreshToken:authTokenHeader });
    //   if (!foundUserToLogout) {

    //      return res.sendStatus(204).send("no user has this refresh token");
    //   }

    // Delete refreshToken in db
    //   foundUserToLogout.refreshToken = '';
    //   await foundUserToLogout.save();
    //   res.removeHeader('authorization');
    res.status(200).send();//.redirect("http://localhost:3000/"); 
  } catch (ex) {
    next(ex);
  }
};



const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({status:false , msg: "No email could not be sent" });
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();


    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

    // HTML Message
    const message = `
    <img src="https://i.ibb.co/q1Hzbxv/tele.jpg" alt="tele" border="0" width="280px" height='100px'>
    <h3>Hi ${user.username},</h3><h4>Someone (hopefully you) has requested a password reset for your Tele-Chat account. Follow the link below to set a new password:</h4>
    <table width="100%" cellspacing="0" cellpadding="0"><tr><td><table cellspacing="0" cellpadding="0"><tr><td style="border-radius: 15px;" bgcolor="#4178f9" height=50px><a href="${resetUrl}" clicktracking=off style="padding: 8px 12px;width:250px;text-align:center; border: 1px solid #39780;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
    Click To Reset Your Password</a></td></tr></table></td></tr></table>
    <h4>If you don't wish to reset your password, disregard this email and no action will be taken.</h4><h4>Tele-Chat Team.</h4>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Tele-Chat Password Reset Request",
        text: message,
      });

      res.json({ status: true,  msg : 'Email sent successfully' , token: resetToken});//
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res.json({status : false , msg: "Email could not be sent" });//
    }
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  // Compare token in URL params to hashed token

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");


  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({  status: false, msg: "Invalid Token" });
    }


    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

 

    const resetUrl = `http://localhost:3000/login`;

    // HTML Message
    const message = `
    <img src="https://i.ibb.co/q1Hzbxv/tele.jpg" alt="tele" border="0" width="280px" height='100px'>
    <h3>Hi ${user.username},</h3><h4>You are receving this email because your password has successfully been changed</h4>
    <table width="100%" cellspacing="0" cellpadding="0"><tr><td><table cellspacing="0" cellpadding="0"><tr><td style="border-radius: 15px;" bgcolor="#4178f9" height=50px><a href="${resetUrl}" clicktracking=off style="padding: 8px 12px;width:250px;text-align:center; border: 1px solid #39780;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 17px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
    Click To Go To Login Page</a></td></tr></table></td></tr></table>
    <h4>Tele-Chat Team.</h4>

    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Tele-Chat Password Reset confirmation",
        text: message,
      });

     
    } catch (err) {
      console.log(err);

     next(err)
    }
    await user.save();
    delete user.password;

    res.json({
      status: true,
      msg: "Password Updated Successfully"
      
      //token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};



export default { createUser, readUser, setAvatar, readAll, logOut, resetPassword, forgetPassword, googleRegistration, googleLogIn }; //, readAuthor, updateAuthor, deleteAuthor };

