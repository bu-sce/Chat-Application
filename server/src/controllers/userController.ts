import User from '../models/userModel';
const bcrypt = require('bcrypt');
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const jwt = require('jsonwebtoken');

const accessToken = (id : any) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20m' 
    });
  };
  const refreshToken = (id : any) => {
      return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1h' // 1d
      });
    };
    

    
    const readUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) return res.json({ msg: 'Incorrect Username or Password', status: false });
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.json({ msg: 'Incorrect Username or Password', status: false });
            delete user.password;
            //generate JWT
            const aToken = accessToken(user._id);
            const rToken = refreshToken(user._id);
            user.refreshToken = rToken; //add refresh token to DB   
            await user.save();
            res.setHeader('authorization' , `Bearer ${rToken}`).status(200).json({ user: user , 'accesstoken' : aToken  });
            
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
        const hashedpassword = await bcrypt.hash(password, 10);

        // const user = new User();
        // user.username = username;
        // user.email = email;
        // user.password = hashedpassword;
        const user = await User.create({ username, email, password: hashedpassword });
        await user.save();
        delete user.password;
        res.json({ status: true, user: user });
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

const setAvatar = async (req : Request, res: Response, next : NextFunction) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        });
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage
        });
    } catch (ex) {
        next(ex);
    }
};

const logOut = async (req : Request, res : Response, next : NextFunction) => {
    try {
       if (!req.params.id) return res.json({ msg: "User id is required " });
          onlineUsers.delete(req.params.id);
  
          // Is refreshToken in header?
          const refreshTokenHeader : any = req.headers['authorization'];
          if(!refreshTokenHeader) return res.status(401).send("authorization header is requied");
  
          // Is refreshToken in DB?
          const authTokenHeader = refreshTokenHeader.split(" ")[1]
          const foundUserToLogout = await User.findOne({ refreshToken:authTokenHeader });
          if (!foundUserToLogout) {
             
             return res.sendStatus(204).send("no user has this refresh token");
          }
  
          // Delete refreshToken in db
          foundUserToLogout.refreshToken = '';
          await foundUserToLogout.save();
          res.removeHeader('authorization');
          res.status(200).redirect("http://localhost:3000/login"); 
    } catch (ex) {
      next(ex);
    }
  };
export default { createUser, readUser , setAvatar , readAll , logOut}; //, readAuthor, updateAuthor, deleteAuthor };


