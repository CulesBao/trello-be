import { baseRepository } from '../../common/base.repository'
import { Permission } from './Permission.entity';

class permissionRepository extends baseRepository<Permission> {
    public async findByName(name: string): Promise<Permission | null> {
        const permission: Permission | null = await this.repository.findOne({ where: { name } });
        return permission;
    }
}
export default new permissionRepository(Permission);