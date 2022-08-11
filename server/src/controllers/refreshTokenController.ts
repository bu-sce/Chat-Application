const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

const accessToken = (id : any) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '20m'
  });
};

const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader:any = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];

    const foundUser = await User.findOne({refreshToken:token }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt
    if(token){ 
    jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        (err : any, decoded : any) => {
            if (err || foundUser._id !== decoded._id) return res.sendStatus(403);
            
            const aToken = accessToken(foundUser._id) ;
            res.json({ aToken })
        }
    )}else{
        res.sendStatus(403);
    }
}

export default  {handleRefreshToken} 