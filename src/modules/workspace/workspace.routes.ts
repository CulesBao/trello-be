import express from 'express'
import workSpaceController from './workspace.controller'
import workSpaceMiddleware from './workspace.middleware'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import { Workspace } from '../../types/workspace'
const router: express.Router = express.Router()

router.route('/')
    .post(authenticationMiddleware.authenticateToken, workSpaceMiddleware.addNewWorkSpace, workSpaceController.addWorkSpace)
router.route('/:id')
    .get(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(Workspace.MEMBER), workSpaceController.getWorkSpaceById)
    .put(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(Workspace.OWNER), workSpaceMiddleware.updateWorkSpace, workSpaceController.updateWorkSpaceById)
    .delete(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(Workspace.OWNER), workSpaceController.deleteWorkSpaceById)

router.route('/:id/:field')
    .get(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(Workspace.MEMBER), workSpaceController.getFieldByIdFromWorkSpace)
router.route('/:id/members')
    .post(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(Workspace.OWNER), workSpaceMiddleware.addNewMemeber, workSpaceController.addMemberToWorkSpace)
    .get(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(Workspace.MEMBER), workSpaceController.getAllMemberFromWorkSpace)
router.route('/:id/member/:memberId')
    .get(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(Workspace.MEMBER), workSpaceController.getMemberByIdFromWorkSpace)
    .delete(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(Workspace.OWNER), workSpaceController.deleteMemberOutWorkSpace)
    // .put(workSpaceMiddleware.updateMember, workSpaceController.updateMember)
// router.route('/:id/board/:boardId')
//     .get(workSpaceController.getBoardFromWorkSpace)
//     .delete(workSpaceController.deleteBoardFromWorkSpace)
// router.route('/:id/boards')
//     .get(workSpaceController.getAllBoard)
// .post(workSpaceController.addBoardToWorkSpace)
export default router