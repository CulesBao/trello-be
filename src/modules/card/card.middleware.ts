import { NextFunction, Request, Response } from "express";
import { baseMiddleware } from "../../middleware/base.middleware";
import { AddCardDTO } from "./card.schema";
import listRepository from "../list/list.repository";
import CustomError from "../../middleware/CustomError";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/User.entity";

class cardMiddleware extends baseMiddleware {
    public addCard = this.validateSchema(AddCardDTO)

    public isMemberInBoard() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const listId : number = Number(req.body.listId) || Number(req.params.id)
                const userId : number = Number(req.id)

                req.list = await listRepository.findById(listId)
                console.log(req.list)
                if (req.list.board.users.find((member : User) => member.id == userId) == undefined) 
                    throw new CustomError(StatusCodes.FORBIDDEN, 'You are not authorized to perform this action')

                next()
            } catch (error : unknown) {
                next(error)
            }
        }
    }
}
export default new cardMiddleware()