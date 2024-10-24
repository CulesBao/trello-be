import { AppDataSource } from '../../config/data-source';
import { Permission } from '../../entity/Permission';
import { Role } from '../../entity/Role';

export class RoleSerivce {
    private roleRepository = AppDataSource.getRepository(Role);
    public async createRole(roleData: Role): Promise<void> {
        const newRole = this.roleRepository.create(roleData)
        await this.roleRepository.save(newRole)
    }
    public async findById(id: number): Promise<Role | null> {
        return await this.roleRepository.findOne({
            where: {
                id: Number(id),
            },
            relations: ['permissions']
        })
    }
    public async findByName(name: string): Promise<Role | null> {
        return await this.roleRepository.findOne({
            where: {
                name: String(name)
            },
            relations: ['permissions']
        })
    }
    public async findAll(): Promise<Role[] | null> {
        return await this.roleRepository.find({
            relations: ['permissions']
        })
    }
    public async delete(id: number): Promise<void> {
        await this.roleRepository.delete({ id: Number(id) })
    }
    public async update(id: number, role: Partial<Role>): Promise<void> {
        await this.roleRepository.update({ id: Number(id) }, role)
    }
    public async assignPermission(role: Role, permission: Permission): Promise<void>{
        role.permissions.push(permission)
        await this.roleRepository.save(role)
    }
}