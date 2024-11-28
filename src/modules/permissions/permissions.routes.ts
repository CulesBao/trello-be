import express from 'express';
import permissionController from './permissions.controller';
import authentication from '../../middleware/authentication.middleware';
import { Permissions } from '../../common/enums/permissions.enum'
import permissionValidation from './permissions.middleware'
const router = express.Router();

router.post('/', authentication.authenticateToken(), authentication.authorizePermission(Permissions.CREATE_PERMISSION), permissionValidation.createPermission, permissionController.createPermission);
router.get('/:id?', authentication.authenticateToken(), authentication.authorizePermission(Permissions.GET_PERMISSION), permissionController.getPermissions);
router.delete('/:id', authentication.authenticateToken(), authentication.authorizePermission(Permissions.DELETE_PERMISSION), permissionController.deletePermission);
export default router;