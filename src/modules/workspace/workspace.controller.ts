import { NextFunction, Request, Response } from "express";
import { Workspace } from "./entity/Workspace";
import { CustomSuccessfulResponse } from "../../template/response.dto";
import workSpaceService from './workspace.service'
import { User } from "../user/entity/User";
import { StatusCodes } from "http-status-codes";
import CustomError from "../../utils/CustomError";

class workSpaceController {
    public async createWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspace: Workspace = req.body
            const adminId: number = Number(req.id)
            const response: CustomSuccessfulResponse = await workSpaceService.createWorkSpace(adminId, workspace)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async getMyWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: number = Number(req.id)
            const response: CustomSuccessfulResponse = await workSpaceService.getMyWorkSpace(userId)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async getWorkSpaceById(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpace: Workspace = req.workSpace
            res.status(StatusCodes.OK).json({
                message: "Get successful",
                data: workSpace
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async updateWorkSpaceById(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceId: number = Number(req.params.workSpaceId)
            const workspace: Workspace = req.body
            const response: CustomSuccessfulResponse = await workSpaceService.updateWorkSpaceById(workspaceId, workspace)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async deleteWorkSpaceById(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpace = req.workSpace
            const response: CustomSuccessfulResponse = await workSpaceService.deleteWorkSpaceById(workSpace.id)
            res.status(response.status).json({
                message: response.message
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async addMemberToWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspace: Workspace = req.workSpace
            const email: string = req.body.email
            const response: CustomSuccessfulResponse = await workSpaceService.addMemberToWorkSpace(workspace, email)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async getAllMemberFromWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpace: Workspace = req.workSpace
            const response: CustomSuccessfulResponse = await workSpaceService.getAllMemberFromWorkSpace(workSpace)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async getMemberByIdFromWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpace: Workspace = req.workSpace
            const memberId: number = Number(req.params.memberId)
            const response: CustomSuccessfulResponse = await workSpaceService.getMemberByIdFromWorkSpace(workSpace, memberId)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async deleteMemberOutWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpace: Workspace = req.workSpace
            const memberId: number = Number(req.params.memberId)
            const response: CustomSuccessfulResponse = await workSpaceService.deleteMemberOutWorkSpace(workSpace, memberId)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async addNewAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const workspace: Workspace = req.workSpace
            const adminId: number = Number(req.params.adminId)
            const response: CustomSuccessfulResponse = await workSpaceService.addNewAdmin(workspace, adminId)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async getAllAdminFromWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpace: Workspace = req.workSpace
            const response: CustomSuccessfulResponse = await workSpaceService.getAllAdminFromWorkSpace(workSpace)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async deleteAdminOutWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workSpace: Workspace = req.workSpace
            const adminId: string = req.params.adminId
            const response: CustomSuccessfulResponse = await workSpaceService.deleteAdminOutWorkSpace(workSpace, Number(adminId))
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
}
export default new workSpaceController()