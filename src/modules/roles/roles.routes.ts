import express from 'express';
import rolesController from './roles.controller';
import authentication from '../../middleware/authentication.middleware'
import { Permissions } from '../../types/permissions';
const router = express.Router();

router.post('/create', authentication.authenticateToken, authentication.authorizePermission(Permissions.CREATE_PERMISSION), rolesController.createRole);
router.get('/get/:id', authentication.authenticateToken, authentication.authorizePermission(Permissions.GET_ROLE), rolesController.getRoles);
router.post('/assign', authentication.authenticateToken, authentication.authorizePermission(Permissions.ASSIGN_PERMISSION), rolesController.assignPermission);
router.delete('/delete/:id', authentication.authenticateToken, authentication.authorizePermission(Permissions.DELETE_ROLE), rolesController.deleteRole);
export default router;