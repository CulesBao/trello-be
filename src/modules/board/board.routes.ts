import express from 'express'
import boardController from './board.controller'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import boardMiddleware from './board.middleware'
const router: express.Router = express.Router()

router.route('/')
    .post(authenticationMiddleware.authenticateToken(), boardMiddleware.isUserInWorkspace(), boardMiddleware.addBoard, boardController.addNewBoardToWorkSpace)
router.route('/:boardId')
    .get(authenticationMiddleware.authenticateToken(),boardMiddleware.isMemberInBoard(), boardController.getBoardFromWorkSpace)
    .put(authenticationMiddleware.authenticateToken(), boardMiddleware.isMemberInBoard(), boardMiddleware.addBoard, boardController.updateBoard)
    .delete(authenticationMiddleware.authenticateToken(), boardMiddleware.isAdminInBoard(), boardController.deleteBoardFromWorkSpace)
router.route('/:boardId/members')
    .get(authenticationMiddleware.authenticateToken(), boardMiddleware.isMemberInBoard(), boardController.getAllMemberFromBoard)
    .post(authenticationMiddleware.authenticateToken(), boardMiddleware.isAdminInBoard(), boardMiddleware.addMember, boardController.addMemberToBoard)
router.route('/:boardId/members/:userId')
    .delete(authenticationMiddleware.authenticateToken(), boardMiddleware.isAdminInBoard(), boardController.removeMemberFromBoard)
export default router