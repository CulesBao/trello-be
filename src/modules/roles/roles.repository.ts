import { baseRepository } from '../../template/base.repository';
import { Permission } from '../permissions/entity/Permission';
import { Role } from './entity/Role';

export class RoleSerivce extends baseRepository<Role> {
    public async findById(id: number): Promise<Role> {
        const entity = await this.repository.findOne({
            where: {
                id: Number(id),
            },
            relations: ['permissions']
        })
        if (!entity)
            throw new Error('Role not found')
        return entity
    }
    public async findByName(name: string): Promise<Role | null> {
        return await this.repository.findOne({
            where: {
                name: String(name)
            },
            relations: ['permissions']
        })
    }
    public override async findAll(): Promise<Role[]> {
        return await this.repository.find({
            relations: ['permissions']
        })
    }
    public async assignPermission(role: Role, permission: Permission): Promise<void> {
        role.permissions.push(permission)
        await this.repository.save(role)
    }
}