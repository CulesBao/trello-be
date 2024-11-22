import { baseMiddleware } from "../../template/base.middleware";
import boardRepository, { BoardRepository } from "./board.repository";
import boardService from "./board.service";
import { AddBoardDTO } from "./dto/Board.dto";
import { Request, Response, NextFunction } from "express";

class boardMiddleware extends baseMiddleware {
    public addBoard = this.validateSchema(AddBoardDTO)
    public isBoardInWorkSpace() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const workSpace = req.workSpace
                const boardId = Number(req.params.boardId)
                const board = boardService.isBoardInWorkSpace(workSpace, boardId)
                req.board = board
                next()
            }
            catch (err) {
                next(err)
            }
        }
    }
    public getParent() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const boardId: number = Number(req.params.boardId)
                const board = await boardRepository.findById(boardId)
                req.board = board
                req.workSpace = board.workSpace
                next()
            }
            catch (err) {
                next(err)
            }
        }
    }
}

export default new boardMiddleware()