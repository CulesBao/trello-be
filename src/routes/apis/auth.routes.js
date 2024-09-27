import express from 'express'
import authMiddleware from '../../middleware/auth.middleware.js'
import authController from '../../controller/auth.controller.js'
const router = express.Router()

router.post('/register', authMiddleware.registerValidation, authController.register)
router.post('/login', authMiddleware.loginValidation, authController.login)

export default router