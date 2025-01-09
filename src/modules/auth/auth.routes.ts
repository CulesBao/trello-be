import express from 'express'
import authMiddleware from './auth.middleware'
import authController from './auth.controller'
import passport from 'passport'

const router: express.Router = express.Router()

router.post('/register', authMiddleware.registerValidation, authController.register)
router.post('/login', authMiddleware.loginValidation, authController.login)
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }))

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://127.0.0.1:5500/src/public/index.html'
    }),
    authController.googleLogin
)

export default router