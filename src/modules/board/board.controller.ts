import { Request, Response, NextFunction } from 'express'
import { CustomSuccessfulResponse } from '../../middleware/successResponse.middleware'
import boardService from './board.service'
import { Workspace } from '../workspace/Workspace.entity'
import { Board } from './Board.entity'
import { User } from '../user/User.entity'
import { Created, NoContent, OK } from '../../handler/success.handler'
import { BoardDTO } from './board.dto'
class boardController {
    public async addNewBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const workspace: Workspace = req.workSpace
            const board: Board = new Board()
            const user: User = req.user

            board.name = req.body.name
            board.description = req.body.description
            board.workspace = workspace
            board.admin = user
            board.users = [user]
            board.lists = []

            const newBoard: BoardDTO = await boardService.addNewBoard(board, user)
            new Created(res, "Board had been created", newBoard)
        }
        catch (err) {
            next(err)
        }
    }
    public async getBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const board: BoardDTO = req.board
            new OK(res, `Board with ID ${board.id} had been found`, board)
        }
        catch (err) {
            next(err)
        }
    }
    public async deleteBoard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const board: Board = req.board
            await boardService.deleteBoard(board)

            new NoContent(res, `Board with ID ${board.id} had been deleted`)
        }
        catch (err) {
            next(err)
        }
    }
    public async getAllBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpace: Workspace = req.workSpace
            const boards: BoardDTO[] = await boardService.getAllBoard(workSpace)

            new OK(res, `All boards from workspace ${workSpace.name} had been found`, boards)
        }
        catch (err) {
            next(err)
        }
    }
    public async updateBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const boardToUpdate = new Board()
            const board: Board = req.board
            const user: User = req.user
            boardToUpdate.name = req.body.name
            boardToUpdate.description = req.body.description

            const updateBoard: BoardDTO = await boardService.updateBoard(boardToUpdate, board.id, user)
            new OK(res, `Board with ID ${updateBoard.id} had been updated`, updateBoard)
        }
        catch (err) {
            next(err)
        }
    }

    public async addMemberToBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const board: Board = req.board
            const email: string = req.body.email
            const user: User = req.user

            const updatedBoard: BoardDTO = await boardService.addMemberToBoard(user, board, email)
            new OK(res, `User with email ${email} had been added to board`, updatedBoard)
        }
        catch (err) {
            next(err)
        }
    }
    public async removeMemberFromBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const board: Board = req.board
            const userId: number = Number(req.params.userId)
            const response: CustomSuccessfulResponse = await boardService.removeMemberFromBoard(board, userId)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
}
export default new boardController()