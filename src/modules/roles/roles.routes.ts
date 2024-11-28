import express from 'express';
import rolesController from './roles.controller';
import authentication from '../../middleware/authentication.middleware'
import { Permissions } from '../../common/enums/permissions.enum'
import roleValidation from './roles.middleware'
const router = express.Router();

router.post('/', authentication.authenticateToken(), authentication.authorizePermission(Permissions.CREATE_ROLE), roleValidation.createRole, rolesController.createRole);
router.get('/:id', authentication.authenticateToken(), authentication.authorizePermission(Permissions.GET_ROLE), rolesController.getRoles);
router.delete('/:id', authentication.authenticateToken(), authentication.authorizePermission(Permissions.DELETE_ROLE), rolesController.deleteRole);
router.post('/assign', authentication.authenticateToken(), authentication.authorizePermission(Permissions.ASSIGN_PERMISSION), roleValidation.assignPermission, rolesController.assignPermission);
router.delete('/remove', authentication.authenticateToken(), authentication.authorizePermission(Permissions.REMOVE_PERMISSION), roleValidation.assignPermission, rolesController.removePermission);
export default router;