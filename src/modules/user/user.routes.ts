import express from 'express';
import authenticationMiddleware from '../../middleware/authentication.middleware'
import userController from './user.controller'
import { Permissions } from '../../common/types/permissions';
import userMiddleware from './user.middleware';

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
    userMiddleware.update ,userController.updateUser)
router.post('/assign-role',
    authenticationMiddleware.authenticateToken,
    authenticationMiddleware.authorizePermission(Permissions.ASSIGN_ROLE),
    userMiddleware.assign,
    userController.assignRole)
router.delete('/remove-role',
    authenticationMiddleware.authenticateToken,
    authenticationMiddleware.authorizePermission(Permissions.REMOVE_ROLE),
    userMiddleware.remove,
    userController.removeRole
)
export default router;