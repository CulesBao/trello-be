import express from 'express'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import commentMiddleware from './comment.middleware'
import commentController from './comment.controller'
import { Permissions } from '../../common/enums/permissions.enum'

const router: express.Router = express.Router()

router.post('/', authenticationMiddleware.authenticateToken(), 
    authenticationMiddleware.authorizePermissionBoard(Permissions.ADD_COMMENT_TO_CARD),
    commentMiddleware.addComment, 
    commentController.addComment)

router.route('/:commentId')
    .delete(authenticationMiddleware.authenticateToken(), commentController.deleteComment)
    .put(authenticationMiddleware.authenticateToken(), commentMiddleware.updateComment, commentController.updateComment)
    .get(authenticationMiddleware.authenticateToken(), commentController.getComment)
export default router