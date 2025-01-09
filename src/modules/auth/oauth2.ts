import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport'
import dotenv from 'dotenv'
import authMiddleware from './auth.middleware'
GoogleStrategy.Strategy
dotenv.config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || ''
},
    authMiddleware.googleService
))

passport.serializeUser(function (token, cb) {
    cb(null, token);
});

passport.deserializeUser(function (token: any, cb) {
    cb(null, token);
});
