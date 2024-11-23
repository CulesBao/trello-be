import { Request, Response, NextFunction } from 'express'
import commentService from './comment.serivce'
import { CustomSuccessfulResponse } from '../../middleware/successResponse.middleware'
import { Card } from '../card/Card.entity'
import { Comment } from './Comment.entity'
import { User } from '../user/User.entity'

class commentController{
    public async addComment(req: Request, res: Response, next: NextFunction) {
        try {
            const commentBody = req.body
            const card: Card = req.card

            const comment : Comment = new Comment()
            comment.content = commentBody.content
            comment.card = card
            comment.user = req.user

            const response : CustomSuccessfulResponse = await commentService.addComment(comment)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (error : unknown) {
            next(error)
        }
    }
    public async deleteComment(req: Request, res: Response, next: NextFunction) {
        try {
            const commentId : number = Number(req.params.commentId)
            const user : User = req.user
            const response : CustomSuccessfulResponse = await commentService.deleteComment(commentId, user.id)
            res.status(response.status).json({
                message: response.message,
            })
        }
        catch (error : unknown) {
            next(error)
        }
    }
    public async updateComment(req: Request, res: Response, next: NextFunction) {
        try {
            const commentId : number = Number(req.params.commentId)
            const commentBody = req.body
            const user : User = req.user

            const comment : Comment = new Comment()
            comment.id = commentId
            comment.content = commentBody.content
            comment.user = user

            const response : CustomSuccessfulResponse = await commentService.updateComment(comment)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (error : unknown) {
            next(error)
        }
    }
    public async getComment(req: Request, res: Response, next: NextFunction) {
        try {
            const commentId : number = Number(req.params.commentId)
            const user : User = req.user
            const response : CustomSuccessfulResponse = await commentService.getComment(commentId, user.id)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (error : unknown) {
            next(error)
        }
    }
}
export default new commentController()