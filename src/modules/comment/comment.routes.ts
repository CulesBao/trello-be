import express from 'express'
import authenticationMiddleware from '../../middleware/authentication.middleware'
import commentMiddleware from './comment.middleware'
import commentController from './comment.controller'

const router: express.Router = express.Router()

router.post('/', authenticationMiddleware.authenticateToken(), commentMiddleware.addComment, commentMiddleware.isUserInBoard(), commentController.addComment)

router.route('/:commentId')
    .delete(authenticationMiddleware.authenticateToken(), commentController.deleteComment)
    .put(authenticationMiddleware.authenticateToken(), commentMiddleware.updateComment, commentController.updateComment)
    .get(authenticationMiddleware.authenticateToken(), commentController.getComment)
export default router