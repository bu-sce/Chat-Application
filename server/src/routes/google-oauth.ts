
const passport = require('passport');
import express,{ Request, Response, NextFunction } from 'express';

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

router.get('/profile' , isLogin , (req: any, res: Response, next: NextFunction) =>{ //protected path
    res.send(`you logged in ${req.cookies.user} `); //req.user
})  

export default router;