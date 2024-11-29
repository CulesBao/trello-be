import { baseRepository } from "../../common/base.repository";
import { MessageConstant } from "../../common/constants/message.constants";
import { NotFound } from "../../handler/failed.handler";
import { AssignRole } from "./AssignRole.entity";

class assignRoleRepository extends baseRepository<AssignRole> {
    public override async create(data: AssignRole): Promise<AssignRole> {
        return await this.repository.save(data);
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
    public async findByUserIdAndWorkSpaceId(userId: number, workSpaceId: number): Promise<AssignRole[]> {
        return await this.repository.find({
            where: {
                user: { id: userId },
                workspace: { id: workSpaceId }
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
        const role: AssignRole | null = await this.repository.findOne({
            where: {
                user: { id: userId },
                role: { name: roleName },
                workspace: { id: workSpaceId }
            }
        })
        if (!role)
            throw new NotFound(MessageConstant.Role.INVALID_ROLE)
        await this.repository.delete(role.id);
    }
    public override async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
export default new assignRoleRepository(AssignRole);

