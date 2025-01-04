import { baseRepository } from "../../common/base.repository";
import { MessageConstant } from "../../common/message.constants";
import { NotFound } from "../../handler/failed.handler";
import { AssignRole } from "./AssignRole.entity";

class assignRoleRepository extends baseRepository<AssignRole> {
    //General
    public override async create(data: AssignRole): Promise<AssignRole> {
        return await this.repository.save(data);
    }
    public override async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
    public async findWithoutWorkSpaceAndBoard(userId: number, roleId: number): Promise<AssignRole | null> {
        return await this.repository.findOne({
            where: {
                user: { id: userId },
                role: { id: roleId }
            },
            relations: ['role', 'workspace', 'board', 'user']
        });
    }
    public async findByUserId(userId: number): Promise<AssignRole[]> {
        return await this.repository.find({
            where: {
                user: { id: userId }
            },
            relations: ['role', 'workspace', 'board', 'user']
        });
    }
    //Workspace
    public async findByUserIdAndWorkSpaceId(userId: number, workSpaceId: number): Promise<AssignRole[]> {
        return await this.repository.find({
            where: {
                user: { id: userId },
                workspace: { id: workSpaceId }
            },
            relations: ['role', 'workspace', 'board', 'user']
        });
    }

    public async findByRoleId(roleId: number): Promise<AssignRole[]> {
        return await this.repository.find({ where: { roleId } });
    }
    public async findForWorkSpace(userId: number, roleName: string, workSpaceId: number): Promise<AssignRole> {
        const assignRole: AssignRole | null = await this.repository.findOne({
            where: {
                user: { id: userId },
                role: { name: roleName },
                workspace: { id: workSpaceId }
            }
        })
        if (!assignRole)
            throw new NotFound(MessageConstant.Role.INVALID_ROLE)
        return assignRole
    }
    public async deleteRoleWorkSpace(userId: number, roleName: string, workSpaceId: number): Promise<void> {
        const role: AssignRole = await this.findForWorkSpace(userId, roleName, workSpaceId);
        await this.repository.delete(role.id);
    }
    //Board
    public async findForBoard(userId: number, roleName: string, boardId: number): Promise<AssignRole> {
        const assignRole: AssignRole | null = await this.repository.findOne({
            where: {
                user: { id: userId },
                role: { name: roleName },
                board: { id: boardId }
            }
        })
        if (!assignRole)
            throw new NotFound(MessageConstant.Role.INVALID_ROLE)
        return assignRole
    }
    public async deleteRoleBoard(userId: number, roleName: string, boardId: number): Promise<void> {
        const role: AssignRole = await this.findForBoard(userId, roleName, boardId);
        await this.repository.delete(role.id);
    }
    public async findRoleByUserIdAndBoardId(userId: number, boardId: number): Promise<AssignRole[]> {
        return await this.repository.find({
            where: {
                user: { id: userId },
                board: { id: boardId }
            },
            relations: ['role', 'workspace', 'board', 'user']
        });
    }

}
export default new assignRoleRepository(AssignRole);

