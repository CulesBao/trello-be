import { User } from "../user/User.entity";
import { Workspace } from "./Workspace.entity";
import workSpaceRepository from "./workspace.repository";
import userRepository from "../user/user.repository";
import { WorkSpaceDTO, WorkSpaceRequest } from "./workspace.dto";
import { BadRequest, Forbidden } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/message.constants";
import assignRoleService from "../assignRole/assignRole.service";
import { Roles } from "../../common/enums/roles.enum";

class workspaceService {
    public async createWorkSpace(workSpaceBody: WorkSpaceRequest, admin: User): Promise<WorkSpaceDTO> {
        const workSpace: Workspace = new Workspace()
        workSpace.name = workSpaceBody.name
        workSpace.description = workSpaceBody.description
        workSpace.admin = [admin]
        workSpace.users = [admin]
        workSpace.boards = []

        const newWorkSpace: Workspace = await workSpaceRepository.create(workSpace)
        await assignRoleService.assignRoleWorkSpace(admin.id, Roles.ADMIN_WORKSPACE, newWorkSpace)
        await assignRoleService.assignRoleWorkSpace(admin.id, Roles.MEMBER_WORKSPACE, newWorkSpace)
        return new WorkSpaceDTO(newWorkSpace)
    }
    public async getWorkSpace(workSpaceId: number): Promise<WorkSpaceDTO> {
        const workSpace: Workspace = await workSpaceRepository.findById(workSpaceId)
        return new WorkSpaceDTO(workSpace)
    }
    public async getWorkSpaceById(workSpaceId: number): Promise<Workspace> {
        const workSpace: Workspace = await workSpaceRepository.findById(workSpaceId)
        return workSpace
    }
    public async getMyWorkSpace(member: User): Promise<WorkSpaceDTO[]> {
        const workSpaces: Workspace[] = await workSpaceRepository.getMyWorkSpace(member.id)
        const workSpaceResponse: WorkSpaceDTO[] = workSpaces.map((workSpace: Workspace) => new WorkSpaceDTO(workSpace))
        return workSpaceResponse
    }
    public async updateWorkSpaceById(id: number, workSpaceUpdate: WorkSpaceRequest): Promise<WorkSpaceDTO> {
        const workSpace: Workspace = await workSpaceRepository.findById(id)

        workSpace.name = workSpaceUpdate.name
        workSpace.description = workSpaceUpdate.description

        const updatedWorkSpace: Workspace = await workSpaceRepository.update(id, workSpace)
        return new WorkSpaceDTO(updatedWorkSpace)
    }

    public async deleteWorkSpaceById(workSpaceId: number): Promise<void> {
        await workSpaceRepository.delete(workSpaceId)
    }

    public async addMemberToWorkSpace(workSpaceId: number, email: string): Promise<WorkSpaceDTO> {
        console.log(workSpaceId, email)
        const workSpace: Workspace = await workSpaceRepository.findById(workSpaceId)
        const isExistUser: User | undefined = workSpace.users.find((value: User) => value.email == email)
        if (isExistUser)
            throw new BadRequest(MessageConstant.Role.EXISTED_MEMBER)
        const newUser: User = await userRepository.findByEmail(email)
        workSpace.users.push(newUser)

        const updatedWorkSpace = await workSpaceRepository.update(workSpace.id, workSpace)
        await assignRoleService.assignRoleWorkSpace(newUser.id, Roles.MEMBER_WORKSPACE, updatedWorkSpace)
        return new WorkSpaceDTO(updatedWorkSpace)
    }

    public async deleteMemberOutWorkSpace(workSpaceId: number, memberId: number): Promise<WorkSpaceDTO> {
        const workSpace: Workspace = await workSpaceRepository.findById(workSpaceId)
        const user: User | undefined = workSpace.users.find((value) => value.id == memberId)
        if (user == undefined)
            throw new BadRequest(MessageConstant.Role.NOT_FOUND_MEMBER)
        const isAdmin = workSpace.admin.find((value) => value.id == memberId)
        if (isAdmin)
            throw new BadRequest(MessageConstant.Role.DELETE_ADMIN)
        workSpace.users = workSpace.users.filter((value) => value.id != memberId)

        const updatedWorkSpace: Workspace = await workSpaceRepository.update(workSpace.id, workSpace)
        await assignRoleService.deleteRoleWorkSpace(memberId, Roles.MEMBER_WORKSPACE, updatedWorkSpace)
        return new WorkSpaceDTO(updatedWorkSpace)
    }
    public async addNewAdmin(workSpaceId: number, userId: number): Promise<WorkSpaceDTO> {
        const workSpace: Workspace = await workSpaceRepository.findById(workSpaceId)
        const isExistUser: User | undefined = workSpace.users.find((value: User) => value.id == userId)
        if (!isExistUser)
            throw new BadRequest(MessageConstant.Role.NOT_FOUND_MEMBER)
        const isExistAdmin: boolean = workSpace.admin.find((value: User) => value.id == userId) != undefined
        if (isExistAdmin)
            throw new BadRequest(MessageConstant.Role.EXISTED_ADMIN)

        const user: User = isExistUser
        workSpace.admin.push(user)
        const updatedWorkSpace: Workspace = await workSpaceRepository.update(workSpace.id, workSpace)
        await assignRoleService.assignRoleWorkSpace(user.id, Roles.ADMIN_WORKSPACE, updatedWorkSpace)
        return new WorkSpaceDTO(updatedWorkSpace)
    }
    public async deleteAdmin(workSpaceId: number, userId: number): Promise<WorkSpaceDTO> {
        const workSpace: Workspace = await workSpaceRepository.findById(workSpaceId)
        const isExistAdmin: boolean = workSpace.admin.find((value: User) => value.id == userId) != undefined
        if (!isExistAdmin)
            throw new BadRequest(MessageConstant.Role.NOT_FOUND_ADMIN)
        if (workSpace.admin.length == 1)
            throw new Forbidden(MessageConstant.Role.REQUIRED_ADMIN)

        workSpace.admin = workSpace.admin.filter((value: User) => value.id != userId)
        const updatedWorkspace: Workspace = await workSpaceRepository.update(workSpace.id, workSpace)
        await assignRoleService.deleteRoleWorkSpace(userId, Roles.ADMIN_WORKSPACE, updatedWorkspace)
        return new WorkSpaceDTO(updatedWorkspace)
    }
}
export default new workspaceService()