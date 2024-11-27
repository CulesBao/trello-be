import express from 'express'
import boardController from './board.controller'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import boardMiddleware from './board.middleware'
const router: express.Router = express.Router()

router.route('/')
    .post(authenticationMiddleware.authenticateToken(), boardMiddleware.isUserInWorkspace(), boardMiddleware.addBoard, boardController.addNewBoard)
router.route('/:boardId')
    .get(authenticationMiddleware.authenticateToken(),boardMiddleware.isMemberInBoard(), boardController.getBoard)
    .put(authenticationMiddleware.authenticateToken(), boardMiddleware.isMemberInBoard(), boardMiddleware.addBoard, boardController.updateBoard)
    .delete(authenticationMiddleware.authenticateToken(), boardMiddleware.isAdminInBoard(), boardController.deleteBoard)
router.route('/:boardId/members')
    .post(authenticationMiddleware.authenticateToken(), boardMiddleware.isAdminInBoard(), boardMiddleware.addMember, boardController.addMemberToBoard)
router.route('/:boardId/members/:userId')
    .delete(authenticationMiddleware.authenticateToken(), boardMiddleware.isAdminInBoard(), boardController.removeMemberFromBoard)
export default router