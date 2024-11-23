import { NextFunction, Request, Response } from "express";
import { baseMiddleware } from "../../middleware/base.middleware";
import { AddMemberDTO, UpdateDTO, WorkspaceDTO, UpdateMemberDTO } from "./workspace.schema";
import { Workspace } from './Workspace.entity'
import { Roles } from "../../common/types/roles";
import workspaceService from "./workspace.service";
import CacheService from "../../service/cache.service";
import { User } from "../user/User.entity";
import CustomError from "../../middleware/CustomError";
import { StatusCodes } from "http-status-codes";
import { TrelloEnum } from "../../common/types/trello"

class workSpaceMiddleware extends baseMiddleware {
    public createWorkSpace = this.validateSchema(WorkspaceDTO)

    public updateWorkSpaceById = this.validateSchema(UpdateDTO)

    public addNewMemeber = this.validateSchema(AddMemberDTO)

    public updateMember = this.validateSchema(UpdateMemberDTO)

    public checkRole(role: string) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const workSpaceId: number = Number(req.params.workSpaceId)
                const userId: number = Number(req.id)
                let workSpaceCache: Object | null | string = await CacheService.get(`${TrelloEnum.Workspace} + ${workSpaceId}`)
                if (workSpaceCache == null) {
                    req.workSpace = await workspaceService.getWorkSpaceById(workSpaceId)
                    CacheService.set(`${TrelloEnum.Workspace} + ${workSpaceId}`, req.workSpace)
                }
                else {
                    req.workSpace = typeof workSpaceCache === 'string' ? JSON.parse(workSpaceCache) : workSpaceCache as Workspace
                }
                switch (role) {
                    case `${Roles.ADMIN}`:
                        const admin: User | undefined = req.workSpace.admin.find((admin: User) => admin.id === userId)
                        if (!admin)
                            throw new CustomError(StatusCodes.FORBIDDEN, "You are not authorized to perform this action")
                        next()
                        break
                    case `${Roles.USER}`:
                        const member: User | undefined = req.workSpace.users?.find((member: User) => member.id === userId)
                        if (!member)
                            throw new CustomError(StatusCodes.FORBIDDEN, "You are not authorized to perform this action")
                        next()
                        break
                    default:
                        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid role")
                }
            }
            catch (err) {
                next(err)
            }
        }
    }
}

export default new workSpaceMiddleware()