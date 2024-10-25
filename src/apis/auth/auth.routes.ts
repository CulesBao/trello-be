import express from 'express'
import authMiddleware from './auth.middleware'
import authController from './auth.controller'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import { Permissions } from '../../types/permissions'

const router: express.Router = express.Router()

router.post('/register', authMiddleware.registerValidation, authController.register)
router.post('/login', authMiddleware.loginValidation, authController.login)
router.get('/get/me', authenticationMiddleware.authenticateToken, authController.getMe);
router.get('/get/all',
    authenticationMiddleware.authenticateToken,
    authenticationMiddleware.authorizePermission(Permissions.GET_USER),
    authController.getAll
);
router.get('/get/:id',
    authenticationMiddleware.authenticateToken,
    authenticationMiddleware.authorizePermission(Permissions.GET_USER),
    authController.get
);
router.delete('/delete/:id',
    authenticationMiddleware.authenticateToken,
    authenticationMiddleware.authorizePermission(Permissions.DELETE_USER),
    authController.deleteUser
);
router.put('/updated', authenticationMiddleware.authenticateToken,
    authMiddleware.updateUser,
    authController.updateUser)
router.post('/assign-role',
    authenticationMiddleware.authenticateToken,
    authenticationMiddleware.authorizePermission(Permissions.ASSIGN_ROLE),
    authController.assignRole)

export default router