import { NextFunction, Request, Response } from "express";
import { baseMiddleware } from "../../template/base.middleware";
import { createListDTO } from "./dto/LIst.dto";
import { List } from "./entity/List";
import listRepository from "./list.repository";
class listMiddleware extends baseMiddleware {
    public createList = this.validateSchema(createListDTO)
    public getParent() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const listId: number = Number(req.params.listId)
                const list: List = await listRepository.findById(listId)
                req.list = list
                req.board = list.board
                next()
            }
            catch (err) {
                next(err)
            }
        }
    }
}
export default new listMiddleware()