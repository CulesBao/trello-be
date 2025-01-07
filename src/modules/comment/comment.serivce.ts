import commentRepository from "./comment.repository";
import { Comment } from "./Comment.entity";
import { User } from "../user/User.entity";
import activityLogController from "../activityLog/activityLog.controller";
import { Board } from "../board/Board.entity";
import boardRepository from "../board/board.repository";
import { Card } from "../card/Card.entity";
import cardRepository from "../card/card.repository";
import { Actions } from "../../common/enums/actitvitiesLog.enum";
import { Forbidden } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/message.constants";

class commentService {
    public async addComment(user: User, comment: Comment): Promise<Comment> {
        const newComment = await commentRepository.create(comment)
        const card: Card = await cardRepository.findById(newComment.card.id)
        const board: Board = await boardRepository.findByListId(card.list.id)
        activityLogController.CommentActivity(user, board.id, Actions.CREATE_COMMENT, newComment.id)
        return newComment
    }
    public async deleteComment(commentId: number, userId: number): Promise<void> {
        const comment: Comment = await commentRepository.findById(commentId)

        if (comment.user.id !== userId) {
            throw new Forbidden(MessageConstant.Comment.FORBIDDEN)
        }
        await commentRepository.delete(comment.id)
    }

    public async updateComment(comment: Comment): Promise<Comment> {
        const commentExists = await commentRepository.findById(comment.id)

        if (commentExists.user.id !== comment.user.id)
            throw new Forbidden(MessageConstant.Comment.FORBIDDEN)
        const updatedComment: Comment = await commentRepository.update(comment.id, comment)
        return updatedComment
    }
    public async getComment(commentId: number): Promise<Comment> {
        const comment: Comment = await commentRepository.findById(commentId)
        return comment
    }
}

export default new commentService()