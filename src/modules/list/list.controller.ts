import { NextFunction, Request, response, Response } from "express";
import { Board } from "../board/entity/Board";
import { List } from "./entity/List";
import { CustomSuccessfulResponse } from "../../template/response.dto";
import listService from './list.service'
class listController {
    public async createList(req: Request, res: Response, next: NextFunction) {
        try {
            const board: Board = req.board
            const list = req.body
            const newList: List = new List();

            newList.name = list.name;
            newList.order = list.order;
            newList.board = board
            newList.cards = []  

            const response: CustomSuccessfulResponse = await listService.createList(newList)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        } catch (error) {
            next(error)
        }
    }
    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const listId: number = Number(req.params.id)
            const userId: number = Number(req.id)
            const response: CustomSuccessfulResponse = await listService.getById(listId, userId)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        } catch (error) {
            next(error)
        }
    }
    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const listId: number = Number(req.params.id)
            const userId: number = Number(req.id)
            const updatedList: List = new List();
            updatedList.name = req.body.name;
            updatedList.order = req.body.order;
            const response: CustomSuccessfulResponse = await listService.updateById(listId, updatedList, userId)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        } catch (error) {
            next(error)
        }
    }
}
export default new listController()