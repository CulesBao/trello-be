import { Request, Response, NextFunction } from 'express'
import { User } from '../user/User.entity'
import { CheckList } from './CheckList.entity'
import checkListService from './checkList.service'
import { Created, NoContent, OK } from '../../handler/success.handler'
import { CheckListDTO } from './checkList.dto'


class checkListController {
    public async addCheckList(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const checkListBody = req.body
            const user: User = req.user as User
            const checkList: CheckList = new CheckList()

            checkList.content = checkListBody.content
            checkList.user = user
            checkList.card = req.card
            checkList.isDone = false

            const newCheckList: CheckList = await checkListService.addCheckList(checkList)
            new Created(res, "CheckList added successfully", new CheckListDTO(newCheckList))
        }
        catch (error: unknown) {
            next(error)
        }
    }
    public async deleteCheckList(req: Request, res: Response, next: NextFunction) {
        try {
            const checkListId: number = Number(req.params.checkListId)
            await checkListService.deleteCheckList(checkListId)
            new NoContent(res)
        }
        catch (error: unknown) {
            next(error)
        }
    }
    public async updateCheckList(req: Request, res: Response, next: NextFunction) {
        try {
            const checkListId: number = Number(req.params.checkListId)
            const checkListBody = req.body

            const checkList: CheckList = new CheckList()
            checkList.id = checkListId
            checkList.content = checkListBody.content
            checkList.isDone = checkListBody.isDone

            const updatedCheckList: CheckList = await checkListService.updateCheckList(checkList)
            new OK(res, "CheckList updated successfully", new CheckListDTO(updatedCheckList))
        }
        catch (error: unknown) {
            next(error)
        }
    }
    public async getCheckList(req: Request, res: Response, next: NextFunction) {
        try {
            const checkListId: number = Number(req.params.checkListId)
            const checkList: CheckList = await checkListService.getCheckList(checkListId)
            new OK(res, "CheckList retrieved successfully", new CheckListDTO(checkList))
        }
        catch (error: unknown) {
            next(error)
        }
    }
}

export default new checkListController()