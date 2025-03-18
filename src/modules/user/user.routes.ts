import express from 'express';
import authenticationMiddleware from '../../middleware/authentication.middleware'
import userController from './user.controller'
import { Permissions } from '../../common/enums/permissions.enum';
import userMiddleware from './user.middleware';

const router: express.Router = express.Router();
router.route('/')
    .get(authenticationMiddleware.authenticateToken(), userController.getMe)
    .put(authenticationMiddleware.authenticateToken(),
        userMiddleware.update, userController.updateUser)

router.get('/:id',
    authenticationMiddleware.authenticateToken(),
    authenticationMiddleware.authorizePermission(Permissions.GET_USER),
    userController.get
);
router.get('/all',
    authenticationMiddleware.authenticateToken(),
    authenticationMiddleware.authorizePermission(Permissions.GET_USER),
    userController.getAll
);
router.delete('/:id',
    authenticationMiddleware.authenticateToken(),
    authenticationMiddleware.authorizePermission(Permissions.DELETE_USER),
    userController.deleteUser
);
router.post('/assign-role',
    authenticationMiddleware.authenticateToken(),
    authenticationMiddleware.authorizePermission(Permissions.ASSIGN_ROLE),
    userMiddleware.assign,
    userController.assignRole)
router.delete('/remove-role',
    authenticationMiddleware.authenticateToken(),
    authenticationMiddleware.authorizePermission(Permissions.REMOVE_ROLE),
    userMiddleware.remove,
    userController.removeRole
)
export default router;