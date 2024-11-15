import { NextFunction, Request, Response } from "express";
import { baseMiddleware } from "../../template/base.middleware";
import { AddMemberDTO, UpdateDTO, WorkspaceDTO, UpdateMemberDTO } from "./dto/workspace.dto";
import { Workspace } from '../../types/workspace'
import workspaceService from "./workspace.service";

class workSpaceMiddleware extends baseMiddleware {
    public addNewWorkSpace = this.validateSchema(WorkspaceDTO)

    public updateWorkSpace = this.validateSchema(UpdateDTO)

    public addNewMemeber = this.validateSchema(AddMemberDTO)

    public updateMember = this.validateSchema(UpdateMemberDTO)
    public checkRole(role: string) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const workSpaceId = Number(req.params.id)
                const userId = Number(req.id)
                if (role == Workspace.OWNER) {
                    const workSpace = await workspaceService.isOwnerOfWorkSpace(userId, workSpaceId)
                    req.workSpace = workSpace
                }
                else if (role == Workspace.MEMBER) {
                    const workSpace = await workspaceService.isMemberOfWorkSpace(userId, workSpaceId)
                    console.log('aaaaaaaaaaaa')
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