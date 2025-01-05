import { Board } from "../board/Board.entity";
import { Role } from "../roles/Role.entity";
import rolesRepository from "../roles/roles.repository";
import { User } from "../user/User.entity";
import userRepository from "../user/user.repository";
import { Workspace } from "../workspace/Workspace.entity";
import { AssignRole } from "./AssignRole.entity";
import assignRoleRepository from "./assignRole.repository";
import client from '../../config/redis.config'

class assignRoleService {
    //General
    public async assignRole(userId: number, roleId: number): Promise<void> {
        const user: User = await userRepository.findById(userId)
        const role: Role = await rolesRepository.findById(roleId)

        const newData = new AssignRole()
        newData.user = user
        newData.role = role

        await assignRoleRepository.create(newData)
        await this.findWithoutWorkSpaceAndBoard(userId, roleId)
    }
    public async findWithoutWorkSpaceAndBoard(userId: number, roleId: number): Promise<AssignRole | null> {
        const cacheValue: string | null = await client.get("user" + userId + "|role" + roleId)
        if (cacheValue) {
            return JSON.parse(cacheValue)
        }
        const role : AssignRole | null= await assignRoleRepository.findWithoutWorkSpaceAndBoard(userId, roleId)
        if (role) {
            await client.set("user" + userId + "|role" + roleId, JSON.stringify(role))
        }
        return role
    }
    public async findRoleByUserId(userId: number): Promise<AssignRole[]> {
        // const cacheValue: string | null = await client.get('role|' + userId)
        // if (cacheValue) {
        //     return JSON.parse(cacheValue)
        // }
        const role: AssignRole[] = await assignRoleRepository.findByUserId(userId)
        // await client.set('role|' + userId, JSON.stringify(role))
        return role
    }

    //Workspace
    public async findRoleByUserIdAndWorkSpaceId(userId: number, workSpaceId: number): Promise<AssignRole[]> {
        const cacheValue: string | null = await client.get('user' + userId + '|workspace' + workSpaceId)
        if (cacheValue) {
            return JSON.parse(cacheValue)
        }
        const role: AssignRole[] = await assignRoleRepository.findByUserIdAndWorkSpaceId(userId, workSpaceId)
        await client.set('user' + userId + '|workspace' + workSpaceId, JSON.stringify(role))
        return role
    }
    public async assignRoleWorkSpace(userId: number, roleName: string, workSpace: Workspace): Promise<void> {
        const user: User = await userRepository.findById(userId)
        const role: Role = await rolesRepository.findByName(roleName)

        const newData = new AssignRole()
        newData.user = user
        newData.role = role
        newData.workspace = workSpace

        await assignRoleRepository.create(newData)
        await client.del('user' + userId + '|workspace' + workSpace.id)
        await this.findRoleByUserIdAndWorkSpaceId(userId, workSpace.id)
    }
    public async findForWorkSpace(user: User, roleName: string, workSpace: Workspace): Promise<AssignRole> {
        return await assignRoleRepository.findForWorkSpace(user.id, roleName, workSpace.id)
    }
    public async deleteRoleWorkSpace(userId: number, roleName: string, workSpace: Workspace): Promise<void> {
        await assignRoleRepository.deleteRoleWorkSpace(userId, roleName, workSpace.id)
        client.del('user' + userId + '|workspace' + workSpace.id)
        await this.findRoleByUserIdAndWorkSpaceId(userId, workSpace.id)
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
        client.del('user' + userId + '|board' + board.id)
        await this.findRoleByUserIdAndBoardId(userId, board.id)
    }
    public async findRoleByUserIdAndBoardId(userId: number, boardId: number): Promise<AssignRole[]> {
        const cacheValue: string | null = await client.get('user' + userId + '|board' + boardId)
        if (cacheValue) {
            return JSON.parse(cacheValue)
        }
        const role: AssignRole[] = await assignRoleRepository.findRoleByUserIdAndBoardId(userId, boardId)
        await client.set('user' + userId + '|board' + boardId, JSON.stringify(role))
        return role
    }
    public async findForBoard(user: User, roleName: string, board: Board): Promise<AssignRole> {
        return await assignRoleRepository.findForBoard(user.id, roleName, board.id)
    }
    public async deleteRoleBoard(userId: number, roleName: string, board: Board): Promise<void> {
        await assignRoleRepository.deleteRoleBoard(userId, roleName, board.id)
        client.del('user' + userId + '|board' + board.id)
        await this.findRoleByUserIdAndBoardId(userId, board.id)
    }
}
export default new assignRoleService();