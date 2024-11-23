import { NextFunction, Request, Response } from "express";
import { baseMiddleware } from "../../middleware/base.middleware";
import { createListDTO, updateListDTO } from "./list.schema";
import { Board } from "../board/Board.entity";
import boardRepository from "../board/board.repository";
import CustomError from "../../middleware/CustomError";
import { StatusCodes } from "http-status-codes";
class listMiddleware extends baseMiddleware {
    public createList = this.validateSchema(createListDTO)
    public updateList = this.validateSchema(updateListDTO)
    public isMemberInBoard() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const boardId: number = Number(req.body.boardId)
                const userId = Number(req.id)
                const board: Board = await boardRepository.findById(boardId)
                req.board = board
                if (board.users.find((value) => value.id == userId) == undefined)
                    throw new CustomError(StatusCodes.NOT_FOUND, `User with ID ${userId} cannot found in this board`)
                next()
            }
            catch (err: unknown) {
                next(err)
            }
        }
    }
}
export default new listMiddleware()