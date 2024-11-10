import express from 'express';
import authenticationMiddleware from '../../middleware/authentication.middleware'
import userController from './user.controller'
import { Permissions } from '../../types/permissions'

const router: express.Router = express.Router();
router.get('/get/me', authenticationMiddleware.authenticateToken, userController.getMe);
router.get('/get/all',
    authenticationMiddleware.authenticateToken,
    authenticationMiddleware.authorizePermission(Permissions.GET_USER),
    userController.getAll
);
router.get('/get/:id',
    authenticationMiddleware.authenticateToken,
    authenticationMiddleware.authorizePermission(Permissions.GET_USER),
    userController.get
);
router.delete('/delete/:id',
    authenticationMiddleware.authenticateToken,
    authenticationMiddleware.authorizePermission(Permissions.DELETE_USER),
    userController.deleteUser
);
router.put('/updated', authenticationMiddleware.authenticateToken,

    userController.updateUser)
router.post('/assign-role',
    authenticationMiddleware.authenticateToken,
    authenticationMiddleware.authorizePermission(Permissions.ASSIGN_ROLE),
    userController.assignRole)
export default router;