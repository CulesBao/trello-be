import { Request } from "express"
import { Workspace } from "../modules/workspace/entity/Workspace"
import { Board } from "../modules/board/entity/Board"
import { List } from "../modules/list/entity/List"
import { Card } from "../modules/card/entity/Card"
import { User } from "../../modules/user/User.entity"
declare global {
    namespace Express {
        interface Request {
            id: number,
            user: User
            workSpace: Workspace,
            board: Board,
            list: List,
            card: Card,
            cardId: number,
            file: any
        }
    }
}