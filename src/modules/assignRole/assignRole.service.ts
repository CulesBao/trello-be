import { Board } from "../board/Board.entity";
import { Role } from "../roles/Role.entity";
import rolesRepository from "../roles/roles.repository";
import { User } from "../user/User.entity";
import userRepository from "../user/user.repository";
import { Workspace } from "../workspace/Workspace.entity";
import { AssignRole } from "./AssignRole.entity";
import assignRoleRepository from "./assignRole.repository";

class assignRoleService {
    //General
    public async assignRole(userId: number, roleId: number): Promise<void> {
        const user: User = await userRepository.findById(userId)
        const role: Role = await rolesRepository.findById(roleId)

        const newData = new AssignRole()
        newData.user = user
        newData.role = role

        await assignRoleRepository.create(newData)
    }
    public async findWithoutWorkSpaceAndBoard(userId: number, roleId: number): Promise<AssignRole | null> {
        return await assignRoleRepository.findWithoutWorkSpaceAndBoard(userId, roleId)
    }
    public async findRoleByUserId(userId: number): Promise<AssignRole[]> {
        return await assignRoleRepository.findByUserId(userId)
    }

    //Workspace
    public async findRoleByUserIdAndWorkSpaceId(userId: number, workSpaceId: number): Promise<AssignRole[]> {
        return await assignRoleRepository.findByUserIdAndWorkSpaceId(userId, workSpaceId)
    }
    public async assignRoleWorkSpace(userId: number, roleName: string, workSpace: Workspace): Promise<void> {
        const user: User = await userRepository.findById(userId)
        const role: Role = await rolesRepository.findByName(roleName)

        const newData = new AssignRole()
        newData.user = user
        newData.role = role
        newData.workspace = workSpace

        await assignRoleRepository.create(newData)
    }
    public async findForWorkSpace(user: User, roleName: string, workSpace: Workspace): Promise<AssignRole> {
        return await assignRoleRepository.findForWorkSpace(user.id, roleName, workSpace.id)
    }
    public async deleteRoleWorkSpace(userId: number, roleName: string, workSpace: Workspace): Promise<void> {
        await assignRoleRepository.deleteRoleWorkSpace(userId, roleName, workSpace.id)
    }

    //Board
    public async assignRoleBoard(userId: number, roleName: string, board: Board): Promise<void> {
        const user: User = await userRepository.findById(userId)
        const role: Role = await rolesRepository.findByName(roleName)


        const newData = new AssignRole()
        newData.user = user
        newData.role = role
        newData.board = board

        await assignRoleRepository.create(newData)
    }
    public async findRoleByUserIdAndBoardId(userId: number, boardId: number): Promise<AssignRole[]> {
        return await assignRoleRepository.findRoleByUserIdAndBoardId(userId, boardId)
    }
    public async findForBoard(user: User, roleName: string, board: Board): Promise<AssignRole> {
        return await assignRoleRepository.findForBoard(user.id, roleName, board.id)
    }
    public async deleteRoleBoard(userId: number, roleName: string, board: Board): Promise<void> {
        await assignRoleRepository.deleteRoleBoard(userId, roleName, board.id)
    }
}
export default new assignRoleService();