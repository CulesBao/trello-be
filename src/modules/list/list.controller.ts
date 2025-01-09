import { NextFunction, Request, Response } from "express";
import { List } from "./List.entity";
import listService from './list.service'
import { ListDTO } from "./list.dto";
import { Created, OK } from "../../handler/success.handler";
import { User } from "../user/User.entity";
class listController {
    public async createList(req: Request, res: Response, next: NextFunction) {
        try {
            const list: ListDTO = await listService.createList(req.user as User, req.body)
            new Created(res, "List created successfully", list)
        } catch (error) {
            next(error)
        }
    }
    public async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const listId: number = Number(req.params.id)
            const list: ListDTO = await listService.findById(listId)

            new OK(res, "List found", list)
        } catch (error) {
            next(error)
        }
    }
    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const listId: number = Number(req.params.id)
            const user: User = req.user as User
            const updatedList: List = new List();
            updatedList.name = req.body.name;
            updatedList.order = req.body.order;

            const list: ListDTO = await listService.updateById(listId, updatedList, user)
            new OK(res, "List updated successfully", list)
        } catch (error) {
            next(error)
        }
    }
}
export default new listController()