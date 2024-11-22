import { Request, Response, NextFunction, response } from 'express'
import { CustomSuccessfulResponse } from '../../template/response.dto'
import boardService from './board.service'
import { Workspace } from '../workspace/entity/Workspace'
import { Board } from './entity/Board'
import { StatusCodes } from 'http-status-codes'
class boardController {
    public async addNewBoardToWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspace: Workspace = req.workSpace
            const board: any = req.body
            const response: CustomSuccessfulResponse = await boardService.addNewBoardToWorkSpace(workspace, board)
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
            const workSpace: Workspace = req.workSpace
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
            const boardToUpdate: Board = req.body
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
}
export default new boardController()