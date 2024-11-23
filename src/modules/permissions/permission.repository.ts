import { baseRepository } from '../../common/base.repository'
import CustomError from '../../middleware/CustomError';
import { Permission } from './Permission.entity';

export class PermissionSerivce extends baseRepository<Permission> {
    public async customFindByField(field: string, value: any): Promise<Permission | null> {
        return await this.repository.findOne({
            where: {
                [field]: value
            }
        })
    }
}