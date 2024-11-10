import express from 'express'
import authMiddleware from './auth.middleware'
import authController from './auth.controller'

const router: express.Router = express.Router()

router.post('/register', authMiddleware.registerValidation, authController.register)
router.post('/login', authMiddleware.loginValidation, authController.login)


export default router