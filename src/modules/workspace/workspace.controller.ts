import { NextFunction, Request, Response } from "express";
import { Workspace } from "./Workspace.entity";
import workSpaceService from './workspace.service'
import { WorkSpaceDTO, WorkSpaceRequest } from "./workspace.dto";
import { User } from "../user/User.entity";
import { Created, NoContent, OK } from "../../handler/success.handler";

class workSpaceController {
    public async createWorkSpace(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const workSpace: WorkSpaceRequest = req.body
            const admin: User = req.user
            const newWorkSpace: WorkSpaceDTO = await workSpaceService.createWorkSpace(workSpace, admin)

            new Created(res, "Create workspace successful", newWorkSpace)
        }
        catch (err) {
            next(err)
        }
    }
    public async getMyWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const user: User = req.user
            const workSpaces: WorkSpaceDTO[] = await workSpaceService.getMyWorkSpace(user)

            new OK(res, "Get my workspace successful", workSpaces)
        }
        catch (err) {
            next(err)
        }
    }
    public async getWorkSpaceById(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpaceId: number = Number(req.params.workSpaceId)
            const workSpaceResponse : WorkSpaceDTO = await workSpaceService.getWorkSpace(workSpaceId)

            new OK(res, "Get workspace successful", workSpaceResponse)
        }
        catch (err) {
            next(err)
        }
    }
    public async updateWorkSpaceById(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpaceId: number = Number(req.params.workSpaceId)
            const workSpace: WorkSpaceRequest = req.body
            const updatedWorkSpace: WorkSpaceDTO = await workSpaceService.updateWorkSpaceById(workSpaceId, workSpace)

            new OK(res, "Update workspace successful", updatedWorkSpace)
        }
        catch (err) {
            next(err)
        }
    }
    public async deleteWorkSpaceById(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpaceId: number = Number(req.params.workSpaceId)
            await workSpaceService.deleteWorkSpaceById(workSpaceId)

            new NoContent(res, "Delete workspace successful")
        }
        catch (err) {
            next(err)
        }
    }
    public async addMemberToWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceId: number = Number(req.params.workSpaceId)
            const email: string = req.body.email
            const updatedWorkSpace: WorkSpaceDTO = await workSpaceService.addMemberToWorkSpace(workspaceId, email)

            new OK(res, "Add member to workspace successful", updatedWorkSpace)
        }
        catch (err) {
            next(err)
        }
    }

    public async deleteMemberOutWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpaceId: number = Number(req.params.workSpaceId)
            const memberId: number = Number(req.params.memberId)
            const updatedWorkSpace: WorkSpaceDTO = await workSpaceService.deleteMemberOutWorkSpace(workSpaceId, memberId)

            new OK(res, "Delete member out workspace successful", updatedWorkSpace)
        }
        catch (err) {
            next(err)
        }
    }
    public async addNewAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceId: number = Number(req.params.workSpaceId)
            const adminId: number = Number(req.params.adminId)
            const updatedWorkSpace: WorkSpaceDTO = await workSpaceService.addNewAdmin(workspaceId, adminId)

            new OK(res, "Add new admin successful", updatedWorkSpace)
        }
        catch (err) {
            next(err)
        }
    }

    public async deleteAdminOutWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpaceId: number = Number(req.params.workSpaceId)
            const adminId: string = req.params.adminId
            await workSpaceService.deleteAdmin(workSpaceId, Number(adminId))

            new OK(res, "Delete admin out workspace successful")
        }
        catch (err) {
            next(err)
        }
    }
}
export default new workSpaceController()