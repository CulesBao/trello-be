import { Request } from "express"
import { Workspace } from "../modules/workspace/entity/Workspace"
import { Board } from "../modules/board/entity/Board"
import { List } from "../modules/list/entity/List"
import { Card } from "../modules/card/entity/Card"
declare global {
    namespace Express {
        interface Request {
            id: number,
            workSpace: Workspace,
            board: Board,
            list: List,
            card: Card
        }
    }
}