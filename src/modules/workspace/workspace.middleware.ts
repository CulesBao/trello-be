import { NextFunction, Request, Response } from "express";
import { baseMiddleware } from "../../middleware/base.middleware";
import { AddMemberSchema, WorkspaceSchema, UpdateSchema, UpdateMemberSchema } from "./workspace.schema";
import { Workspace } from './Workspace.entity'
import { Roles } from "../../common/enums/roles.enum";
import workspaceService from "./workspace.service";
import { User } from "../user/User.entity";
import { BadRequest, Forbidden } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/message.constants";


class workSpaceMiddleware extends baseMiddleware {
    public createWorkSpace = this.validateSchema(WorkspaceSchema)

    public updateWorkSpaceById = this.validateSchema(UpdateSchema)

    public addNewMemeber = this.validateSchema(AddMemberSchema)

    public updateMember = this.validateSchema(UpdateMemberSchema)

    public checkRole(role: string) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const workSpaceId: number = Number(req.params.workSpaceId)
                const userId: number = Number(req.id)
                const workSpace: Workspace = await workspaceService.getWorkSpaceById(workSpaceId)
                req.workSpace = workSpace

                switch (role) {
                    case `${Roles.ADMIN}`:
                        const admin: User | undefined = req.workSpace.admin.find((admin: User) => admin.id === userId)
                        if (!admin)
                            throw new Forbidden(MessageConstant.Role.ADMIN)
                        next()
                        break
                    case `${Roles.USER}`:
                        const member: User | undefined = req.workSpace.users?.find((member: User) => member.id === userId)
                        if (!member)
                            throw new Forbidden(MessageConstant.Role.MEMBER)
                        next()
                        break
                    default:
                        throw new BadRequest(MessageConstant.Role.INVALID_ROLE)
                }
            }
            catch (err) {
                next(err)
            }
        }
    }
}

export default new workSpaceMiddleware()