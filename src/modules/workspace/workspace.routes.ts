import express from 'express'
import workSpaceController from './workspace.controller'
import workSpaceMiddleware from './workspace.middleware'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import { WorkspaceEnum } from '../../types/workspace'

const router: express.Router = express.Router()

router.route('/')
    .post(authenticationMiddleware.authenticateToken, workSpaceMiddleware.createWorkSpace, workSpaceController.createWorkSpace)
    .get(authenticationMiddleware.authenticateToken, workSpaceController.getMyWorkSpace)
router.route('/:workSpaceId')
    .get(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.MEMBER), workSpaceController.getWorkSpaceById)
    .put(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.MEMBER), workSpaceMiddleware.updateWorkSpaceById, workSpaceController.updateWorkSpaceById)
    .delete(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.OWNER), workSpaceController.deleteWorkSpaceById)
router.route('/:workSpaceId/members')
    .post(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.OWNER), workSpaceMiddleware.addNewMemeber, workSpaceController.addMemberToWorkSpace)
    .get(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.MEMBER), workSpaceController.getAllMemberFromWorkSpace)
router.route('/:workSpaceId/member/:memberId')
    .get(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.MEMBER), workSpaceController.getMemberByIdFromWorkSpace)
    .delete(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.OWNER), workSpaceController.deleteMemberOutWorkSpace)
router.route('/:workSpaceId/admins')
    .get(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.MEMBER), workSpaceController.getAllAdminFromWorkSpace)
router.route('/:workSpaceId/admin/:adminId')
    .post(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.OWNER), workSpaceController.addNewAdmin)
    .delete(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.OWNER), workSpaceController.deleteAdminOutWorkSpace)
export default router