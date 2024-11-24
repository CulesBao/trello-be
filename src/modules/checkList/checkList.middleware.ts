import { Request, Response, NextFunction } from "express";
import cardRepository from "../card/card.repository";
import { Card } from "../card/Card.entity";
import CustomError from "../../middleware/CustomError";
import { StatusCodes } from "http-status-codes";
import { baseMiddleware } from "../../middleware/base.middleware";
import { AddCheckList, UpdateCheckList } from "./checkList.schema";


class checkListMiddleware extends baseMiddleware{
    public AddCheckList = this.validateSchema(AddCheckList)
    public UpdateCheckList = this.validateSchema(UpdateCheckList)

    public isUserInBoard() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const cardId: number = Number(req.body.cardId)
                const userId = req.id

                const card: Card = await cardRepository.findById(cardId)
                if (card.list.board.users.find(user => user.id === userId) === undefined) 
                    throw new CustomError(StatusCodes.FORBIDDEN, "You are not in this board")
                req.card = card

                next()
            }
            catch (error : unknown) {
                next(error)
            }
        }
    }
}

export default new checkListMiddleware()