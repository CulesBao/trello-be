import { Request, Response, NextFunction } from 'express'
import commentService from './comment.serivce'
import { Card } from '../card/Card.entity'
import { Comment } from './Comment.entity'
import { User } from '../user/User.entity'
import { OK } from '../../handler/success.handler'
import { CommentDTO } from './comment.dto'

class commentController {
    public async addComment(req: Request, res: Response, next: NextFunction) {
        try {
            const commentRequest = req.body
            const card: Card = req.card
            const comment: Comment = new Comment()
            const user: User = req.user

            comment.content = commentRequest.content
            comment.card = card
            comment.user = req.user

            const newComment: Comment = await commentService.addComment(user, comment)
            new OK(res, 'Comment added successfully', new CommentDTO(newComment))
        }
        catch (error: unknown) {
            next(error)
        }
    }
    public async deleteComment(req: Request, res: Response, next: NextFunction) {
        try {
            const commentId: number = Number(req.params.commentId)
            const user: User = req.user
            await commentService.deleteComment(commentId, user.id)

            new OK(res, 'Comment deleted successfully')
        }
        catch (error: unknown) {
            next(error)
        }
    }
    public async updateComment(req: Request, res: Response, next: NextFunction) {
        try {
            const commentId: number = Number(req.params.commentId)
            const commentBody = req.body
            const user: User = req.user

            const comment: Comment = new Comment()
            comment.id = commentId
            comment.content = commentBody.content
            comment.user = user

            const updatedComment: Comment = await commentService.updateComment(comment)
            new OK(res, 'Comment updated successfully', new CommentDTO(updatedComment))
        }
        catch (error: unknown) {
            next(error)
        }
    }
    public async getComment(req: Request, res: Response, next: NextFunction) {
        try {
            const commentId: number = Number(req.params.commentId)
            const comment: Comment = await commentService.getComment(commentId)
            new OK(res, 'Comment retrieved successfully', new CommentDTO(comment))
        }
        catch (error: unknown) {
            next(error)
        }
    }
}
export default new commentController()