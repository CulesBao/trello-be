import { baseRepository } from '../../common/base.repository'
import { MessageConstant } from '../../common/message.constants';
import { NotFound } from '../../handler/failed.handler';
import { Permission } from './Permission.entity';

class permissionRepository extends baseRepository<Permission> {
    public async findByName(name: string): Promise<Permission | null> {
        const permission: Permission | null = await this.repository.findOne({ where: { name } });
        return permission;
    }
    public async findById(id: number): Promise<Permission> {
        const permission: Permission | null = await this.repository.findOne({ where: { id } });
        if (!permission)
            throw new NotFound(MessageConstant.Permission.NOT_FOUND)
        return permission;
    }
}
export default new permissionRepository(Permission);