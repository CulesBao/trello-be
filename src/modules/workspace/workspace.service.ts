import { User } from "../user/entity/User";
import { Workspace } from "./entity/Workspace";
import { WorkSpaceRepository } from "./workspace.repository";
import { UserService } from "../user/user.repository";
import { CustomSuccessfulResponse } from "../../template/response.dto";
import { StatusCodes } from "http-status-codes";
import CustomError from "../../utils/CustomError";

class workspaceService{
    private workSpaceRepository = new WorkSpaceRepository(Workspace)
    private userRepository = new UserService(User)
    public async addNewWorkSpace(ownerId: number, workspace: Workspace): Promise<CustomSuccessfulResponse>{
        const user: User = await this.userRepository.findById(ownerId)
        if (!workspace.users) {
            workspace.users = [];
        }
        workspace.owner = user
        workspace.users.push(user)

        await this.workSpaceRepository.create(workspace)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, "Create new workspace success", workspace)
    }

    public async getWorkSpaceById(workSpaceId: number): Promise<CustomSuccessfulResponse>{
        const workSpace: Workspace = await this.workSpaceRepository.findById(workSpaceId)
        return new CustomSuccessfulResponse(StatusCodes.OK, "Get workspace completed", workSpace)
    }

    public async updateWorkSpaceById(workSpaceId: number, workspace: Workspace): Promise<CustomSuccessfulResponse> {
        await this.workSpaceRepository.update(workSpaceId, workspace)
        return new CustomSuccessfulResponse(StatusCodes.OK, "Update workspace successful", workspace)
    }

    public async deleteWorkSpaceById(workSpaceId: number): Promise<CustomSuccessfulResponse>{
        await this.workSpaceRepository.delete(workSpaceId)
        return new CustomSuccessfulResponse(StatusCodes.OK, "Delete successful")
    }

    public async getFieldByIdFromWorkSpace(workSpace: Workspace, field: string): Promise<CustomSuccessfulResponse>{
        return new CustomSuccessfulResponse(StatusCodes.OK, `Get field ${field} successful`, workSpace[field])
    }

    public async addMemberToWorkSpace(workSpaceId: number, user: User): Promise<CustomSuccessfulResponse>{
        const realUser: User = await this.userRepository.findByField('email', user.email)
        await this.workSpaceRepository.addMemberToWorkSpace(workSpaceId, realUser)
        const workspace : Workspace = await this.workSpaceRepository.findById(workSpaceId)
        return new CustomSuccessfulResponse(StatusCodes.OK, "Add member to workspace successful", workspace)
    }

    public async getAllMemberFromWorkSpace(workSpace: Workspace): Promise<CustomSuccessfulResponse>{
        return new CustomSuccessfulResponse(StatusCodes.OK, "Add member to workspace successful", workSpace.users)
    }

    public async getMemberByIdFromWorkSpace(workSpace: Workspace, userId: number): Promise<CustomSuccessfulResponse>{
        const user: User | undefined = workSpace.users.find((value) => value.id == userId)
        if (user == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `User with id ${userId} cannot found in this workspace`)
        return new CustomSuccessfulResponse(StatusCodes.OK, "Add member to workspace successful", user)
    }

    public async deleteMemberOutWorkSpace(workSpaceId: number, memberId: number): Promise<CustomSuccessfulResponse> {
        await this.workSpaceRepository.deleteMemberOutOfWorkspace(workSpaceId, memberId)
        return new CustomSuccessfulResponse(StatusCodes.OK, `Delete member with ID ${memberId} out of workspace with ID ${workSpaceId}!`)
    }
    
    public async isOwnerOfWorkSpace(userId: number, workSpaceId: number): Promise<Workspace>{
        const workSpace = await this.workSpaceRepository.findById(workSpaceId)
        const user: User = await this.userRepository.findById(userId)
        if (workSpace.owner.id != user.id)
            throw new CustomError(StatusCodes.FORBIDDEN, `User is not owner of this workspace`)
        return workSpace
    }

    public async isMemberOfWorkSpace(userId: number, workSpaceId: number): Promise<Workspace> {
        const workSpace: Workspace = await this.workSpaceRepository.findById(workSpaceId)
        if (!workSpace.users.find((value) => value.id == userId))
            throw new CustomError(StatusCodes.FORBIDDEN, `User cannot get workspace with id ${workSpaceId}`)
        return workSpace
    }
}
export default new workspaceService()