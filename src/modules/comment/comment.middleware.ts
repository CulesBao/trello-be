import { baseMiddleware } from "../../middleware/base.middleware";
import { AddComment, UpdateComment } from "./comment.schema";
import { Request, Response, NextFunction } from "express";
import cardRepository from "../card/card.repository";
import { Card } from "../card/Card.entity";
import CustomError from "../../middleware/CustomError";
import { StatusCodes } from "http-status-codes";

class commentMiddleware extends baseMiddleware {
    public addComment = this.validateSchema(AddComment)
    public updateComment = this.validateSchema(UpdateComment)

    public isUserInBoard() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const cardId: number = Number(req.body.cardId)
                const userId = req.id

                const card: Card = await cardRepository.findById(cardId)
                console.log(card)
                if (card.list.board.users.find(user => user.id === userId) === undefined) 
                    throw new CustomError(StatusCodes.FORBIDDEN, "You are not in this board")

                next()
            }
            catch (error : unknown) {
                next(error)
            }
        }
    }
}

export default new commentMiddleware()