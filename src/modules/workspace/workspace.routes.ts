import express from 'express'
import workSpaceController from './workspace.controller'
import workSpaceMiddleware from './workspace.middleware'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import { Permissions } from '../../common/enums/permissions.enum'

const router: express.Router = express.Router()

router.route('/')
    .post(authenticationMiddleware.authenticateToken(), workSpaceMiddleware.createWorkSpace, workSpaceController.createWorkSpace)
    .get(authenticationMiddleware.authenticateToken(), workSpaceController.getMyWorkSpace)
router.route('/:workSpaceId')
    .get(authenticationMiddleware.authenticateToken(), authenticationMiddleware.authorizePermissionWorkSpace(Permissions.GET_WORKSPACE), workSpaceController.getWorkSpaceById)
    .put(authenticationMiddleware.authenticateToken(), authenticationMiddleware.authorizePermissionWorkSpace(Permissions.UPDATE_WORKSPACE), workSpaceMiddleware.updateWorkSpaceById, workSpaceController.updateWorkSpaceById)
    .delete(authenticationMiddleware.authenticateToken(), authenticationMiddleware.authorizePermissionWorkSpace(Permissions.DELETE_WORKSPACE), workSpaceController.deleteWorkSpaceById)
router.route('/:workSpaceId/members')
    .post(authenticationMiddleware.authenticateToken(), authenticationMiddleware.authorizePermissionWorkSpace(Permissions.ADD_USER_TO_WORKSPACE), workSpaceMiddleware.addNewMemeber, workSpaceController.addMemberToWorkSpace)
router.route('/:workSpaceId/members/:memberId')
    .delete(authenticationMiddleware.authenticateToken(), authenticationMiddleware.authorizePermissionWorkSpace(Permissions.REMOVE_USER_FROM_WORKSPACE), workSpaceController.deleteMemberOutWorkSpace)
router.route('/:workSpaceId/admin/:adminId')
    .post(authenticationMiddleware.authenticateToken(), authenticationMiddleware.authorizePermissionWorkSpace(Permissions.ADD_MEMBER_AS_ADMIN), workSpaceController.addNewAdmin)
    .delete(authenticationMiddleware.authenticateToken(), authenticationMiddleware.authorizePermissionWorkSpace(Permissions.REMOVE_ADMIN_FROM_WORKSPACE), workSpaceController.deleteAdminOutWorkSpace)
export default router