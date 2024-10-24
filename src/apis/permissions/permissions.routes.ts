import express from 'express';
import permissionController from './permissions.controller';
import authentication from '../../middleware/authentication.middleware';
import { Permissions } from '../../constants/permissions.constants';
const router = express.Router();

router.post('/create', authentication.authenticateToken, authentication.authorizePermission(Permissions.CREATE_PERMISSION), permissionController.createPermission);
router.get('/get/:id?', authentication.authenticateToken, authentication.authorizePermission(Permissions.GET_PERMISSION), permissionController.getPermissions);
router.delete('/delete/:id?', authentication.authenticateToken, authentication.authorizePermission(Permissions.DELETE_PERMISSION), permissionController.deletePermission);
export default router;