import { baseMiddleware } from "../../middleware/base.middleware";
import boardRepository from "./board.repository";
import boardService from "./board.service";
import { AddBoardDTO, AddMemberDTO } from "./Board.dto";
import { Request, Response, NextFunction } from "express";
import { Board } from "./Board.entity";
import CustomError from "../../middleware/CustomError";
import { StatusCodes } from "http-status-codes";
import { Workspace } from "../workspace/Workspace.entity";
import { WorkSpaceRepository } from "../workspace/workspace.repository";

class boardMiddleware extends baseMiddleware {
    private workSpaceRepository: WorkSpaceRepository = new WorkSpaceRepository(Workspace)
    public addBoard = this.validateSchema(AddBoardDTO)
    public addMember = this.validateSchema(AddMemberDTO)
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
    public isMemberInBoard() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const boardId: number = Number(req.params.boardId)
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
    public isAdminInBoard() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const boardId: number = Number(req.params.boardId)
                const userId = Number(req.id)
                const board: Board = await boardRepository.findById(boardId)
                req.board = board
                if (board.admin.id != userId)
                    throw new CustomError(StatusCodes.FORBIDDEN, `User with ID ${userId} cannot access this board`)
                next()
            }
            catch (err: unknown) {
                next(err)
            }
        }
    }
    public getParent() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const workSpaceId: number = Number(req.body.workSpaceId)
                const workSpace: Workspace = await this.workSpaceRepository.findById(workSpaceId)
                req.workSpace = workSpace

                next()
            }
            catch (err: unknown) {
                next(err)
            }
        }
    }
}

export default new boardMiddleware()