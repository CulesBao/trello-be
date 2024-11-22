import { Request, Response, NextFunction } from 'express'
import { CustomSuccessfulResponse } from '../../template/response.dto'
import boardService from './board.service'
import { Workspace } from '../workspace/entity/Workspace'
import { Board } from './entity/Board'
class boardController {
    public async addNewBoardToWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspace: Workspace = req.workSpace
            const board: Board = new Board()
            const userId : number = Number(req.id)
            board.name = req.body.name
            board.description = req.body.description

            const response: CustomSuccessfulResponse = await boardService.addNewBoardToWorkSpace(workspace, board, userId)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async getBoardFromWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const board : Board = req.board
            const reponse: CustomSuccessfulResponse = await boardService.getBoardFromWorkSpace(board)
            res.status(reponse.status).json({
                message: reponse.message,
                data: reponse.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async deleteBoardFromWorkSpace(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const board : Board = req.board
            const response: CustomSuccessfulResponse = await boardService.deleteBoardFromWorkSpace(board.id)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async getAllBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpace: Workspace = req.workSpace
            const response: CustomSuccessfulResponse = await boardService.getAllBoard(workSpace)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async updateBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const boardToUpdate = new Board()
            boardToUpdate.name = req.body.name
            boardToUpdate.description = req.body.description
            const board : Board = req.board

            const response: CustomSuccessfulResponse = await boardService.updateBoard(boardToUpdate, board.id)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async getAllMemberFromBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const board : Board = req.board
            const response: CustomSuccessfulResponse = await boardService.getAllMemberFromBoard(board)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async addMemberToBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const board : Board = req.board
            const email: string = req.body.email
            const response: CustomSuccessfulResponse = await boardService.addMemberToBoard(board, email)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async removeMemberFromBoard(req: Request, res: Response, next: NextFunction) {
        try {
            const board : Board = req.board
            const userId : number = Number(req.params.userId)
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