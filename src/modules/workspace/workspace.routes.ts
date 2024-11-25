import express from 'express'
import workSpaceController from './workspace.controller'
import workSpaceMiddleware from './workspace.middleware'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import { Roles } from '../../common/enums/roles.enum'

const router: express.Router = express.Router()

router.route('/')
    .post(authenticationMiddleware.authenticateToken(), workSpaceMiddleware.createWorkSpace, workSpaceController.createWorkSpace)
    .get(authenticationMiddleware.authenticateToken(), workSpaceController.getMyWorkSpace)
router.route('/:workSpaceId')
    .get(authenticationMiddleware.authenticateToken(), workSpaceMiddleware.checkRole(Roles.USER), workSpaceController.getWorkSpaceById)
    .put(authenticationMiddleware.authenticateToken(), workSpaceMiddleware.checkRole(Roles.USER), workSpaceMiddleware.updateWorkSpaceById, workSpaceController.updateWorkSpaceById)
    .delete(authenticationMiddleware.authenticateToken(), workSpaceMiddleware.checkRole(Roles.ADMIN), workSpaceController.deleteWorkSpaceById)
router.route('/:workSpaceId/members')
    .post(authenticationMiddleware.authenticateToken(), workSpaceMiddleware.checkRole(Roles.ADMIN), workSpaceMiddleware.addNewMemeber, workSpaceController.addMemberToWorkSpace)
    .get(authenticationMiddleware.authenticateToken(), workSpaceMiddleware.checkRole(Roles.USER), workSpaceController.getAllMemberFromWorkSpace)
router.route('/:workSpaceId/member/:memberId')
    .get(authenticationMiddleware.authenticateToken(), workSpaceMiddleware.checkRole(Roles.USER), workSpaceController.getMemberByIdFromWorkSpace)
    .delete(authenticationMiddleware.authenticateToken(), workSpaceMiddleware.checkRole(Roles.ADMIN), workSpaceController.deleteMemberOutWorkSpace)
router.route('/:workSpaceId/admins')
    .get(authenticationMiddleware.authenticateToken(), workSpaceMiddleware.checkRole(Roles.USER), workSpaceController.getAllAdminFromWorkSpace)
router.route('/:workSpaceId/admin/:adminId')
    .post(authenticationMiddleware.authenticateToken(), workSpaceMiddleware.checkRole(Roles.ADMIN), workSpaceController.addNewAdmin)
    .delete(authenticationMiddleware.authenticateToken(), workSpaceMiddleware.checkRole(Roles.ADMIN), workSpaceController.deleteAdminOutWorkSpace)
export default router