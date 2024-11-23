import commentRepository from "./comment.repository";
import { Comment } from "./Comment.entity";
import { CustomSuccessfulResponse } from "../../middleware/successResponse.middleware";
import { StatusCodes } from "http-status-codes";

class commentService {
    public async addComment(comment: Comment): Promise<CustomSuccessfulResponse> {
        const newComment = await commentRepository.create(comment)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, 'Comment added successfully', newComment)
    }
    public async deleteComment(commentId: number, userId: number): Promise<CustomSuccessfulResponse> {
        const comment = await commentRepository.findById(commentId)

        if (comment.user.id !== userId) {
            return new CustomSuccessfulResponse(StatusCodes.UNAUTHORIZED, 'You are not authorized to delete this comment')
        }
        await commentRepository.delete(comment.id)

        return new CustomSuccessfulResponse(StatusCodes.OK, 'Comment deleted successfully')
    }

    public async updateComment(comment: Comment): Promise<CustomSuccessfulResponse> {
        const commentExists = await commentRepository.findById(comment.id)

        if (commentExists.user.id !== comment.user.id) {
            return new CustomSuccessfulResponse(StatusCodes.UNAUTHORIZED, 'You are not authorized to update this comment')
        }
        const updatedComment = await commentRepository.update(comment.id, comment)
        return new CustomSuccessfulResponse(StatusCodes.OK, 'Comment updated successfully', updatedComment)
    }
    public async getComment(commentId: number, userId: number): Promise<CustomSuccessfulResponse> {
        const comment = await commentRepository.findById(commentId)

        if (comment.user.id !== userId) 
            return new CustomSuccessfulResponse(StatusCodes.UNAUTHORIZED, 'You are not authorized to view this comment')
        
        return new CustomSuccessfulResponse(StatusCodes.OK, 'Comment retrieved successfully', comment)
    }
}

export default new commentService()