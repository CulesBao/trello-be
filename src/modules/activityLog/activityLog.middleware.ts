import { Request, Response, NextFunction } from "express";
import { Board } from "../board/Board.entity";
import boardRepository from "../board/board.repository";
import { User } from "../user/User.entity";
import CustomError from "../../middleware/CustomError";
import { StatusCodes } from "http-status-codes";

class activityLogMiddlware{
    public isUserInBoard() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const boardId: number = parseInt(req.params.id)
                const user: User = req.user

                const board: Board = await boardRepository.findById(boardId)
                if (board.users.find((value: User) => user.id == value.id) == undefined) 
                    throw new CustomError(StatusCodes.FORBIDDEN, 'User is not in board')
                req.board = board

                next()
            }
            catch (error: unknown) {
                next(error)
            }
        }
    }
}
export default new activityLogMiddlware()