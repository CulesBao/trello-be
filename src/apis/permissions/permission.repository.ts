import { AppDataSource } from '../../config/data-source';
import { Permission } from '../../entity/Permission';

export class PermissionSerivce {
    private permissionRepository = AppDataSource.getRepository(Permission);
    public async createPermission(permissionData: Permission): Promise<void> {
        const newpermission = this.permissionRepository.create(permissionData)
        await this.permissionRepository.save(newpermission)
    }
    public async findById(id: number): Promise<Permission | null> {
        return await this.permissionRepository.findOne({
            where: {
                id: Number(id),
            }
        })
    }
    public async findByName(name: string): Promise<Permission | null> {
        return await this.permissionRepository.findOne({
            where: {
                name: String(name)
            }
        })
    }
    public async findAll(): Promise<Permission[] | null> {
        return await this.permissionRepository.find({
        })
    }
    public async delete(id: number): Promise<void> {
        await this.permissionRepository.delete({ id: Number(id) })
    }
    public async update(id: number, permission: Partial<Permission>): Promise<void> {
        await this.permissionRepository.update({ id: Number(id) }, permission)
    }
}