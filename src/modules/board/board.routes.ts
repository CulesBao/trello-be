import express from 'express'
import boardController from './board.controller'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import boardMiddleware from './board.middleware'
import { Permissions } from '../../common/enums/permissions.enum'
const router: express.Router = express.Router()

router.route('/')
    .post(authenticationMiddleware.authenticateToken(), 
    authenticationMiddleware.authorizePermissionWorkSpace(Permissions.CREATE_BOARD),
    boardMiddleware.addBoard, 
    boardController.addNewBoard)
router.route('/:boardId')
    .get(authenticationMiddleware.authenticateToken(),
        authenticationMiddleware.authorizePermissionBoard(Permissions.GET_BOARD),
        boardController.getBoard)
    .put(authenticationMiddleware.authenticateToken(), 
        authenticationMiddleware.authorizePermissionBoard(Permissions.UPDATE_BOARD),
        boardMiddleware.addBoard, 
        boardController.updateBoard)
    .delete(authenticationMiddleware.authenticateToken(), 
        authenticationMiddleware.authorizePermissionBoard(Permissions.DELETE_BOARD),
        boardController.deleteBoard)
router.route('/:boardId/members')
    .post(authenticationMiddleware.authenticateToken(), 
    authenticationMiddleware.authorizePermissionBoard(Permissions.ADD_MEMBER_TO_BOARD),
    boardMiddleware.addMember, 
    boardController.addMemberToBoard)
router.route('/:boardId/members/:userId')
    .delete(authenticationMiddleware.authenticateToken(), 
    authenticationMiddleware.authorizePermissionBoard(Permissions.REMOVE_MEMBER_FROM_BOARD),
    boardController.removeMemberFromBoard)
export default router