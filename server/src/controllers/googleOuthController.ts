const passport = require('passport');
import { Request, Response, NextFunction } from 'express';



const get_google  = passport.authenticate('google', {
    scope: ['profile', 'email']
})

const get_google_redirect = (req: any, res: Response, next: NextFunction) => {

    res.cookie('user' , `${req.user.username}`).redirect('/auth/profile'); //expire after 1 min  ,{ expires: new Date(Date.now() + 60*1000)}
}

export default { get_google ,get_google_redirect};