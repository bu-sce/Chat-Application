const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
import User from '../models/userModel';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



passport.serializeUser((user :any , done : any) => {
    done(null , user.id); //user.id
})
passport.deserializeUser((id :any , done : any) => {
    User.findById(id).then((user:any) => {
        
        done(null , user.id);   
    }) 
})

const refreshTokenC = (id : any) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '2d'
    });
  };
  

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'http://localhost:9090/google/redirect'// 
    },async (accessToken : any, refreshToken : any,profile : any, done : any ) => {//, res : Response
        // passport callback function
        console.log('passport callback function fired:');
        

        // check if user already exists in our own db
        const googleId = profile._json.sub;
        const googleUsercheck = await User.findOne({ googleId: googleId });
        if (googleUsercheck) {
            const rToken = refreshTokenC(googleUsercheck._id);
            googleUsercheck.refreshToken = rToken;
            await googleUsercheck.save();
            done(null , googleUsercheck)
        }
        else{
            const username = profile.displayName;
            const email = profile._json.email;
            const password = Math.random().toString(36).slice(-10);
            const hashedpassword = await bcrypt.hash(password, 10);
            const googleId = profile._json.sub;
            const rToken = refreshToken(googleId);
            
            const user = await User.create({ username, email, password : hashedpassword ,refreshToken : rToken ,googleId });
            await user.save();
            done(null , user)

        }

    })
);
