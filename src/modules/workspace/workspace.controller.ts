import { NextFunction, Request, Response } from "express";
import { Workspace } from "./entity/Workspace";
import { CustomSuccessfulResponse } from "../../template/response.dto";
import workSpaceService from './workspace.service'
import { User } from "../user/entity/User";
import { StatusCodes } from "http-status-codes";
import CustomError from "../../utils/CustomError";

class workSpaceController {
    public async addWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspace: Workspace = req.body
            const response: CustomSuccessfulResponse = await workSpaceService.addNewWorkSpace(Number(req.id), workspace)
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
            const workspaceId: string = req.params.id
            const workspace: Workspace = req.body
            const response: CustomSuccessfulResponse = await workSpaceService.updateWorkSpaceById(Number(workspaceId), workspace)
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
            const workspaceId: string = req.params.id
            const response: CustomSuccessfulResponse = await workSpaceService.deleteWorkSpaceById(Number(workspaceId))
            res.status(response.status).json({
                message: response.message
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async getFieldByIdFromWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const field: string = req.params.field
            const workSpace: Workspace = req.workSpace
            const response: CustomSuccessfulResponse = await workSpaceService.getFieldByIdFromWorkSpace(workSpace, field)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err) {
            next(err)
        }
    }
    public async addMemberToWorkSpace(req: Request, res: Response, next: NextFunction) {
        try {
            const workspaceId: number = Number(req.params.id)
            const user: User = req.body
            const response: CustomSuccessfulResponse = await workSpaceService.addMemberToWorkSpace(Number(workspaceId), user)
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
            const memberId: string = req.params.memberId
            const response: CustomSuccessfulResponse = await workSpaceService.getMemberByIdFromWorkSpace(workSpace, Number(memberId))
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
            const workspaceId: string = req.params.id
            const memberId: string = req.params.memberId
            if (memberId == req.id)
                throw new CustomError(StatusCodes.FORBIDDEN, "Cannot delete admin out of workspace")
            const response: CustomSuccessfulResponse = await workSpaceService.deleteMemberOutWorkSpace(Number(workspaceId), Number(memberId))
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