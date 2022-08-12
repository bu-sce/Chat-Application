// const jwt = require('jsonwebtoken');
// import { Request, Response, NextFunction } from 'express';

// const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader:any = req.headers.authorization || req.headers.Authorization;
//     if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
//     const token = authHeader.split(' ')[1];
//     if(token){
//     jwt.verify(
//         token,
//         process.env.ACCESS_TOKEN_SECRET, 
//         (err:any , decoded : any) => {
//             if (err) return res.sendStatus(403).json({"message1" : err}); //invalid token

//             else{
//             res.locals.jwt = decoded;
//             next();
//             }
           
//         }
       
//     )}else{
//         return res.status(401).json({message : 'unAuthorized'})
//     }
// }


// export default  verifyJWT;