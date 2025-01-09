import { Request, Response, NextFunction } from 'express'
import boardService from './board.service'
import { Workspace } from '../workspace/Workspace.entity'
import { Board } from './Board.entity'
import { User } from '../user/User.entity'
import { Created, NoContent, OK } from '../../handler/success.handler'
import { BoardDTO } from './board.dto'
import workspaceRepository from '../workspace/workspace.repository'
class boardController {
    public async addNewBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const workspace: Workspace = await workspaceRepository.findById(Number(req.body.workspaceId))
            const board: Board = new Board()
            const user: User = req.user as User

            board.name = req.body.name
            board.description = req.body.description
            board.workspace = workspace
            board.admin = user
            board.users = [user]
            board.lists = []

            const newBoard: Board = await boardService.addNewBoard(board, user)
            new Created(res, "Board had been created", new BoardDTO(newBoard))
        }
        catch (err) {
            next(err)
        }
    }
    public async getBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const boardId: number = Number(req.params.boardId)
            const board: BoardDTO = await boardService.getBoard(boardId)

            new OK(res, `Board with ID ${board.id} had been found`, board)
        }
        catch (err) {
            next(err)
        }
    }
    public async deleteBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const boardId: number = Number(req.params.boardId)
            await boardService.deleteBoard(boardId)

            new NoContent(res)
        }
        catch (err) {
            next(err)
        }
    }
    public async updateBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const boardToUpdate = new Board()
            const boardId: number = Number(req.params.boardId)
            const user: User = req.user as User
            boardToUpdate.name = req.body.name
            boardToUpdate.description = req.body.description

            const updateBoard: BoardDTO = await boardService.updateBoard(boardToUpdate, boardId, user)
            new OK(res, `Board with ID ${updateBoard.id} had been updated`, updateBoard)
        }
        catch (err) {
            next(err)
        }
    }

    public async addMemberToBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const boardId: number = Number(req.params.boardId)
            const email: string = req.body.email
            const user: User = req.user as User

            const updatedBoard: BoardDTO = await boardService.addMemberToBoard(user, boardId, email)
            new OK(res, `User with email ${email} had been added to board`, updatedBoard)
        }
        catch (err) {
            next(err)
        }
    }
    public async removeMemberFromBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const boardId: number = Number(req.params.boardId)
            const userId: number = Number(req.params.userId)

            const updatedBoard: BoardDTO = await boardService.removeMemberFromBoard(boardId, userId)
            new OK(res, `User with ID ${userId} had been removed from board`, updatedBoard)
        }
        catch (err) {
            next(err)
        }
    }
}
export default new boardController()