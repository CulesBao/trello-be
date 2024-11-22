import { NextFunction, Request, Response } from "express";
import { baseMiddleware } from "../../template/base.middleware";
import { AddMemberDTO, UpdateDTO, WorkspaceDTO, UpdateMemberDTO } from "./dto/workspace.dto";
import { Workspace } from './entity/Workspace'
import { WorkspaceEnum } from "../../types/workspace";
import workspaceService from "./workspace.service";
import CacheService from "../cache/cache.service";
import { User } from "../user/entity/User";
import CustomError from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";
import { TrelloEnum } from "../../types/trello";

class workSpaceMiddleware extends baseMiddleware {
    public createWorkSpace = this.validateSchema(WorkspaceDTO)

    public updateWorkSpaceById = this.validateSchema(UpdateDTO)

    public addNewMemeber = this.validateSchema(AddMemberDTO)

    public updateMember = this.validateSchema(UpdateMemberDTO)

    public checkRole(role: string) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const workSpaceId : number = Number(req.params.workSpaceId)
                const userId : number = Number(req.id)
                let workSpaceCache : Object | null | string = await CacheService.get(`${TrelloEnum.Workspace} + ${workSpaceId}`)
                if (workSpaceCache == null) {
                    req.workSpace = await workspaceService.getWorkSpaceById(workSpaceId)
                    CacheService.set(`${TrelloEnum.Workspace} + ${workSpaceId}`, req.workSpace)
                }
                else{
                    req.workSpace = typeof workSpaceCache === 'string' ? JSON.parse(workSpaceCache) : workSpaceCache as Workspace
                }
                switch (role) {
                    case `${WorkspaceEnum.OWNER}`:
                        const admin : User | undefined = req.workSpace.admin.find((admin : User) => admin.id === userId)
                        if (!admin) 
                            throw new CustomError(StatusCodes.FORBIDDEN, "You are not authorized to perform this action")
                        next()
                        break
                    case `${WorkspaceEnum.MEMBER}`:
                        const member : User | undefined = req.workSpace.users?.find((member : User) => member.id === userId)
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