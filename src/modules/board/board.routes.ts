import express from 'express'
import boardController from './board.controller'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import workSpaceMiddleware from '../workspace/workspace.middleware'
import { WorkspaceEnum } from '../../types/workspace'
import boardMiddleware from './board.middleware'
const router: express.Router = express.Router()

router.route('/:workSpaceId/board/:boardId')
    .get(boardMiddleware.getParent(), authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.MEMBER), boardController.getBoardFromWorkSpace)
    .delete(boardMiddleware.getParent(), authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.OWNER), boardController.deleteBoardFromWorkSpace)
    .put(boardMiddleware.getParent(), authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.MEMBER), boardController.updateBoard)
router.route('/:workSpaceId/boards')
    .get(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.MEMBER), boardController.getAllBoard)
    .post(authenticationMiddleware.authenticateToken, workSpaceMiddleware.checkRole(WorkspaceEnum.MEMBER), boardMiddleware.addBoard, boardController.addNewBoardToWorkSpace)
export default router
// router.route('/')
//     .post(boardController.createNewBoard)
// router.route('/:id')
//     .get(boardController.getBoardById)
//     .put(boardController.updateBoardById)
//     .delete(boardController.deleteBoardById)
// router.route('/:id/lists/')
//     .post(boardController.addNewListToBoard)
//     .get(boardController.getAllLists)
// router.route('/:id/list/:listId')
//     .get(boardController.getListById)
//     .put(boardController.updateListById)
//     .delete(boardController.deleteListById)
// router.route('/:id/card/:cardId')
//     .get(boardController.getCardFromBoardId)
// router.route('/:id/cards')
//     .get(boardController.getCardsFromBoardId)
// router.route('/:id/members')
//     .get(boardController.getAllMemberFromBoardId)
// router.route('/:id/member/:idMember')
//     .post(boardController.addNewMemberToBoard)
//     .put(boardController.updateMemberFromBoard)
//     .delete(boardController.deleteMemberFromBoard)