import { NextFunction, Request, Response } from "express";
import { baseMiddleware } from "../../template/base.middleware";
import { AddMemberDTO, UpdateDTO, WorkspaceDTO, UpdateMemberDTO } from "./dto/workspace.dto";
import { Workspace } from './entity/Workspace'
import { WorkspaceEnum } from "../../types/workspace";
import workspaceService from "./workspace.service";
import client from "../../config/redis.config";

class workSpaceMiddleware extends baseMiddleware {
    public createWorkSpace = this.validateSchema(WorkspaceDTO)

    public updateWorkSpaceById = this.validateSchema(UpdateDTO)

    public addNewMemeber = this.validateSchema(AddMemberDTO)

    public updateMember = this.validateSchema(UpdateMemberDTO)

    public checkRole(role: string) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const workSpaceId = Number(req.params.workSpaceId)
                const userId = Number(req.id)
                let workSpaceString: string | null = await client.get('workspace')
                let workSpace: Workspace = workSpaceString != null ? JSON.parse(workSpaceString) : new Workspace();
                if (role == WorkspaceEnum.OWNER) {
                    workSpace = (workSpace.id != workSpaceId) ? await workspaceService.isOwnerOfWorkSpace(userId, workSpaceId) : workSpace
                    req.workSpace = workSpace
                }
                else if (role == WorkspaceEnum.MEMBER) {
                    workSpace = (workSpace.id != workSpaceId) ? await workspaceService.isMemberOfWorkSpace(userId, workSpaceId) : workSpace
                    req.workSpace = workSpace
                }
                next()
            }
            catch (err) {
                next(err)
            }
        }
    }
}

export default new workSpaceMiddleware()