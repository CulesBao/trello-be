import { baseMiddleware } from "../../middleware/base.middleware";
import boardRepository from "./board.repository";
import { AddBoardDTO, AddMemberDTO } from "./board.schema";
import { Request, Response, NextFunction } from "express";
import { Board } from "./Board.entity";
import { Workspace } from "../workspace/Workspace.entity";
import workspaceRepository from "../workspace/workspace.repository";
import { Forbidden } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/constants/message.constants";

class boardMiddleware extends baseMiddleware {
    public addBoard = this.validateSchema(AddBoardDTO)
    public addMember = this.validateSchema(AddMemberDTO)

    public isMemberInBoard() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const boardId: number = Number(req.params.boardId)
                const userId = Number(req.id)
                const board: Board = await boardRepository.findById(boardId)
                req.board = board
                if (board.users.find((value) => value.id == userId) == undefined)
                    throw new Forbidden(MessageConstant.Role.MEMBER)
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
                    throw new Forbidden(MessageConstant.Role.ADMIN)
                next()
            }
            catch (err: unknown) {
                next(err)
            }
        }
    }
    public isUserInWorkspace() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const workSpaceId: number = Number(req.body.workSpaceId)
                const workSpace: Workspace = await workspaceRepository.findById(workSpaceId)

                if (workSpace.users.find((value) => value.id == req.id) == undefined)
                    throw new Forbidden(MessageConstant.Role.MEMBER)

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