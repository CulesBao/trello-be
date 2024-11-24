import { Request, Response, NextFunction } from 'express'
import { CustomSuccessfulResponse } from '../../middleware/successResponse.middleware'
import { Card } from '../card/Card.entity'
import { User } from '../user/User.entity'
import { CheckList } from './CheckList.entity'
import checkListService from './checkList.service'


class checkListController {
    public async addCheckList(req: Request, res: Response, next: NextFunction) {
        try {
            const checkListBody = req.body
            const user: User = req.user

            const checkList: CheckList = new CheckList()
            checkList.content = checkListBody.content
            checkList.user = user
            checkList.card = req.card
            checkList.isDone = false

            const response: CustomSuccessfulResponse = await checkListService.addCheckList(checkList)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (error: unknown) {
            next(error)
        }
    }
    public async deleteCheckList(req: Request, res: Response, next: NextFunction) {
        try {
            const checkListId: number = Number(req.params.checkListId)
            const user: User = req.user
            const response: CustomSuccessfulResponse = await checkListService.deleteCheckList(checkListId, user.id)
            res.status(response.status).json({
                message: response.message,
            })
        }
        catch (error: unknown) {
            next(error)
        }
    }
    public async updateCheckList(req: Request, res: Response, next: NextFunction) {
        try {
            const checkListId: number = Number(req.params.checkListId)
            const checkListBody = req.body
            const user: User = req.user

            const checkList: CheckList = new CheckList()
            checkList.id = checkListId
            checkList.content = checkListBody.content
            checkList.user = user
            checkList.isDone = checkListBody.isDone

            const response: CustomSuccessfulResponse = await checkListService.updateCheckList(checkList)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (error: unknown) {
            next(error)
        }
    }
    public async getCheckList(req: Request, res: Response, next: NextFunction) {
        try {
            const checkListId: number = Number(req.params.checkListId)
            const user: User = req.user
            const response: CustomSuccessfulResponse = await checkListService.getCheckList(checkListId, user.id)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (error: unknown) {
            next(error)
        }
    }
}

export default new checkListController()