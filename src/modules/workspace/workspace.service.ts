import { User } from "../user/User.entity";
import { Workspace } from "./Workspace.entity";
import workSpaceRepository from "./workspace.repository";
import { UserService } from "../user/user.repository";
import { WorkSpaceDTO, WorkSpaceConstructor, WorkSpaceRequest } from "./workspace.dto";
import { BadRequest, Forbidden } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/constants/message.constants";

class workspaceService {
    private userRepository = new UserService(User)
    public async createWorkSpace(workSpaceBody: WorkSpaceRequest, admin: User): Promise<void> {
        const workSpace: Workspace = new Workspace()
        workSpace.name = workSpaceBody.name
        workSpace.description = workSpaceBody.description
        workSpace.admin = [admin]
        workSpace.users = [admin]
        workSpace.boards = []

        await workSpaceRepository.create(workSpace)
    }
    public async getWorkSpace(workSpace: Workspace): Promise<WorkSpaceDTO> {
        return WorkSpaceConstructor(workSpace)
    }
    public async getWorkSpaceById(workSpaceId: number): Promise<Workspace> {
        const workSpace: Workspace = await workSpaceRepository.findById(workSpaceId)
        return workSpace
    }
    public async getMyWorkSpace(member: User): Promise<WorkSpaceDTO[]> {
        const workSpaces: Workspace[] = await workSpaceRepository.getMyWorkSpace(member.id)
        const workSpaceResponse: WorkSpaceDTO[] = workSpaces.map((workSpace: Workspace) => WorkSpaceConstructor(workSpace))
        return workSpaceResponse
    }
    public async updateWorkSpaceById(id: number, workSpaceUpdate: WorkSpaceRequest): Promise<WorkSpaceDTO> {
        const workSpace: Workspace = await workSpaceRepository.findById(id)

        workSpace.name = workSpaceUpdate.name
        workSpace.description = workSpaceUpdate.description

        const updatedWorkSpace: Workspace = await workSpaceRepository.update(id, workSpace)
        return WorkSpaceConstructor(updatedWorkSpace)
    }

    public async deleteWorkSpaceById(workSpaceId: number): Promise<void> {
        await workSpaceRepository.delete(workSpaceId)
    }

    public async addMemberToWorkSpace(workSpace: Workspace, email: string): Promise<WorkSpaceDTO> {
        const isExistUser: User | undefined = workSpace.users.find((value: User) => value.email == email)
        if (isExistUser)
            throw new BadRequest(MessageConstant.Role.EXISTED_MEMBER)
        const newUser: User = await this.userRepository.findByEmail(email)
        workSpace.users.push(newUser)

        const updatedWorkSpace = await workSpaceRepository.update(workSpace.id, workSpace)
        return WorkSpaceConstructor(updatedWorkSpace)
    }

    public async deleteMemberOutWorkSpace(workSpace: Workspace, memberId: number): Promise<void> {
        const user: User | undefined = workSpace.users.find((value) => value.id == memberId)
        if (user == undefined)
            throw new BadRequest(MessageConstant.Role.NOT_FOUND_MEMBER)
        const isAdmin = workSpace.admin.find((value) => value.id == memberId)
        if (isAdmin)
            throw new BadRequest(MessageConstant.Role.DELETE_ADMIN)
        workSpace.users = workSpace.users.filter((value) => value.id != memberId)

        await workSpaceRepository.update(workSpace.id, workSpace)
    }
    public async addNewAdmin(workSpace: Workspace, userId: number): Promise<WorkSpaceDTO> {
        const isExistUser: User | undefined = workSpace.users.find((value: User) => value.id == userId)
        if (!isExistUser)
            throw new BadRequest(MessageConstant.Role.NOT_FOUND_MEMBER)
        const isExistAdmin: boolean = workSpace.admin.find((value: User) => value.id == userId) != undefined
        if (isExistAdmin)
            throw new BadRequest(MessageConstant.Role.EXISTED_ADMIN)

        const user: User = isExistUser
        workSpace.admin.push(user)
        const updatedWorkSpace: Workspace = await workSpaceRepository.update(workSpace.id, workSpace)
        return WorkSpaceConstructor(updatedWorkSpace)
    }
    public async deleteAdmin(workSpace: Workspace, userId: number): Promise<void> {
        const isExistAdmin: boolean = workSpace.admin.find((value: User) => value.id == userId) != undefined
        if (!isExistAdmin)
            throw new BadRequest(MessageConstant.Role.NOT_FOUND_ADMIN)
        if (workSpace.admin.length == 1)
            throw new Forbidden(MessageConstant.Role.REQUIRED_ADMIN)

        workSpace.admin = workSpace.admin.filter((value: User) => value.id != userId)
        await workSpaceRepository.update(workSpace.id, workSpace)
    }
}
export default new workspaceService()