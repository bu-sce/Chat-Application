
const passport = require('passport');
import express,{ Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import googleController from '../controllers/googleOuthController';

const router = express.Router();

const isLogin = (req: any, res: Response, next: NextFunction) => {
    if(!req.cookies.session){  
        res.redirect('http://localhost:3000/login'); 
    }
    else{
        next();
    }
}



// auth with google+
router.get('/google',googleController.get_google);
// router.get('/google');
// callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google') , googleController.get_google_redirect );

router.get('/profile' , isLogin , async(req: any, res: Response, next: NextFunction) =>{ //protected path
    
    // res.redirect('http://localhost:3000/setavatar'); 
    const user = await User.findOne({ googleId:req.cookies.googleID });
    //const user = await User.findOne({ username:req.cookies.user });
    const obj = JSON.stringify(user);    
    const jsonData = JSON.parse(obj);
    
    const data = {'_id' : jsonData._id , 'username' : jsonData.username , 'isAvatarImageSet' : jsonData.isAvatarImageSet , 'avatarImage' : jsonData.avatarImage}
    //console.log(`Data ${data} ${req.cookies.googleID}`)
    return res.json({ status: true, user : data  });//.send(`you logged in ${req.cookies.user} `)
})  

export default router;