import express from 'express'
import authMiddleware from '../../middleware/auth.middleware.js'
import authController from '../../controller/auth.controller.js'

const router : express.Router = express.Router()

router.post('/register', authMiddleware.registerValidation, authController.register)
router.post('/login', authMiddleware.loginValidation, authController.login)
router.get('/get/:id', authController.get)
router.get('/get', authController.getAllUsers)
router.delete('/delete/:id', authController.deleteUser)
router.put('/updated', authMiddleware.updateUser, authController.updateUser)

export default router