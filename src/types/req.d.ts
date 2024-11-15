import { Request } from "express"
import { Workspace } from "../modules/workspace/entity/Workspace"
declare global {
    namespace Express {
        interface Request {
            id: number,
            workSpace: Workspace
        }
    }
}