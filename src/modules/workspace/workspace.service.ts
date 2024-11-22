import { User } from "../user/entity/User";
import { Workspace } from "./entity/Workspace";
import { WorkSpaceRepository } from "./workspace.repository";
import { UserService } from "../user/user.repository";
import { CustomSuccessfulResponse } from "../../template/response.dto";
import { StatusCodes } from "http-status-codes";
import CustomError from "../../utils/CustomError";
import client from "../../config/redis.config";

class workspaceService {
    private workSpaceRepository = new WorkSpaceRepository(Workspace)
    private userRepository = new UserService(User)
    public async createWorkSpace(adminId: number, workspace: Workspace): Promise<CustomSuccessfulResponse> {
        const user: User = await this.userRepository.findById(adminId)
        workspace.users = [user]
        workspace.boards = []
        workspace.admin = [user]

        await this.workSpaceRepository.create(workspace)
        client.set('workspace', JSON.stringify(workspace))
        return new CustomSuccessfulResponse(StatusCodes.CREATED, "Create new workspace success", workspace)
    }
    public async getMyWorkSpace(userId: number): Promise<CustomSuccessfulResponse> {
        const workSpace: Workspace[] = await this.workSpaceRepository.getMyWorkSpace(userId)
        if (workSpace.length == 0)
            throw new CustomError(StatusCodes.NOT_FOUND, "User does not have any workspace")
        return new CustomSuccessfulResponse(StatusCodes.OK, "Get all workspace successful", workSpace)
    }
    public async updateWorkSpaceById(workSpaceId: number, workspace: Workspace): Promise<CustomSuccessfulResponse> {
        await this.workSpaceRepository.update(workSpaceId, workspace)
        client.set('workspace', JSON.stringify(workspace))
        return new CustomSuccessfulResponse(StatusCodes.OK, "Update workspace successful", workspace)
    }

    public async deleteWorkSpaceById(workSpaceId: number): Promise<CustomSuccessfulResponse> {
        const workSpace: Workspace = await this.workSpaceRepository.findById(workSpaceId)
        if (workSpace == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, "Workspace cannot found")
        await this.workSpaceRepository.delete(workSpaceId)
        return new CustomSuccessfulResponse(StatusCodes.OK, "Delete successful")
    }

    public async getFieldByIdFromWorkSpace(workSpace: Workspace, field: string): Promise<CustomSuccessfulResponse> {
        if (workSpace[field] == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `${field} cannot found in workspace`)
        return new CustomSuccessfulResponse(StatusCodes.OK, `Get field ${field} successful`, workSpace[field])
    }

    public async addMemberToWorkSpace(workSpace: Workspace, user: User): Promise<CustomSuccessfulResponse> {
        const isExistUser: boolean = workSpace.users.find((value: User) => value.email == user.email) != undefined
        if (isExistUser)
            throw new CustomError(StatusCodes.BAD_REQUEST, "User is already member of this workspace")
        const realUser: User = await this.userRepository.findByField('email', user.email)
        const workspace = await this.workSpaceRepository.addMemberToWorkSpace(workSpace, realUser)
        client.set('workspace', JSON.stringify(workspace))
        return new CustomSuccessfulResponse(StatusCodes.OK, "Add member to workspace successful", workspace)
    }

    public async getAllMemberFromWorkSpace(workSpace: Workspace): Promise<CustomSuccessfulResponse> {
        if (workSpace.users == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `User cannot found in this workspace`)
        return new CustomSuccessfulResponse(StatusCodes.OK, "Get member successful", workSpace.users)
    }

    public async getMemberByIdFromWorkSpace(workSpace: Workspace, userId: number): Promise<CustomSuccessfulResponse> {
        const user: User | undefined = workSpace.users.find((value) => value.id == userId)
        if (user == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `User with id ${userId} cannot found in this workspace`)
        return new CustomSuccessfulResponse(StatusCodes.OK, "Get member from workspace successful", user)
    }

    public async deleteMemberOutWorkSpace(workSpace: Workspace, memberId: number): Promise<CustomSuccessfulResponse> {
        const user: User | undefined = workSpace.users.find((value) => value.id == memberId)
        if (user == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `User with id ${memberId} cannot found in this workspace`)
        workSpace.users = workSpace.users.filter((value) => value.id != memberId)
        await this.workSpaceRepository.update(workSpace.id, workSpace)
        client.set('workspace', JSON.stringify(workSpace))
        return new CustomSuccessfulResponse(StatusCodes.OK, `Delete member with ID ${memberId} out of workspace with ID ${workSpace.id}!`)
    }

    public async isOwnerOfWorkSpace(userId: number, workSpaceId: number): Promise<Workspace> {
        const workSpace = await this.workSpaceRepository.findById(workSpaceId)
        const isExistAdmin: User | undefined = workSpace.admin.find((value: User) => value.id == userId)
        if (isExistAdmin == undefined)
            throw new CustomError(StatusCodes.FORBIDDEN, `User must be admin of this workspace`)
        return workSpace
    }

    public async isMemberOfWorkSpace(userId: number, workSpaceId: number): Promise<Workspace> {
        const workSpace: Workspace = await this.workSpaceRepository.findById(workSpaceId)
        if (!workSpace.users.find((value) => value.id == userId))
            throw new CustomError(StatusCodes.FORBIDDEN, `User cannot access this workspace`)
        return workSpace
    }
    public async getBoardFromWorkSpace(workSpace: Workspace, boardId: number): Promise<CustomSuccessfulResponse> {
        const board = workSpace.boards.find((value) => value.id == boardId)
        if (board == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `Board with id ${boardId} cannot found in this workspace`)
        return new CustomSuccessfulResponse(StatusCodes.OK, "Get board from workspace successful", board)
    }
    public async deleteBoardFromWorkSpace(workSpace: Workspace, boardId: number): Promise<CustomSuccessfulResponse> {
        workSpace.boards = workSpace.boards.filter((value) => value.id != boardId)
        await this.workSpaceRepository.update(workSpace.id, workSpace)
        client.set('workspace', JSON.stringify(workSpace))
        return new CustomSuccessfulResponse(StatusCodes.OK, `Delete board with id ${boardId} out of workspace with id ${workSpace.id} successful`)
    }
    public async getAllBoard(workSpace: Workspace): Promise<CustomSuccessfulResponse> {
        return new CustomSuccessfulResponse(StatusCodes.OK, "Get all boards successful", workSpace.boards)
    }
    public async addNewAdmin(workSpace: Workspace, userId: number): Promise<CustomSuccessfulResponse> {
        const isExistUser: boolean = workSpace.users.find((value: User) => value.id == userId) != undefined
        if (!isExistUser)
            throw new CustomError(StatusCodes.BAD_REQUEST, "User is not member of this workspace")
        const isExistAdmin: boolean = workSpace.admin.find((value: User) => value.id == userId) != undefined
        if (isExistAdmin)
            throw new CustomError(StatusCodes.BAD_REQUEST, "User is already admin of this workspace")
        const user: User = await this.userRepository.findById(userId)
        workSpace.admin.push(user)
        await this.workSpaceRepository.update(workSpace.id, workSpace)
        return new CustomSuccessfulResponse(StatusCodes.OK, "Add new admin successful", workSpace)
    }
    public async getAllAdminFromWorkSpace(workSpace: Workspace): Promise<CustomSuccessfulResponse> {
        return new CustomSuccessfulResponse(StatusCodes.OK, "Get all admin successful", workSpace.admin)
    }
    public async deleteAdminOutWorkSpace(workSpace: Workspace, userId: number): Promise<CustomSuccessfulResponse> {
        const isExistAdmin: boolean = workSpace.admin.find((value: User) => value.id == userId) != undefined
        if (!isExistAdmin)
            throw new CustomError(StatusCodes.BAD_REQUEST, "User is not admin of this workspace")
        workSpace.admin = workSpace.admin.filter((value: User) => value.id != userId)
        await this.workSpaceRepository.update(workSpace.id, workSpace)
        return new CustomSuccessfulResponse(StatusCodes.OK, "Delete admin successful", workSpace)
    }
}
export default new workspaceService()