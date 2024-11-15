import { baseRepository } from '../../template/base.repository';
import CustomError from '../../utils/CustomError';
import { Permission } from './entity/Permission';

export class PermissionSerivce extends baseRepository<Permission> {
    public async customFindByField(field: string, value: any): Promise<Permission | null>{
        return await this.repository.findOne({
            where:{
                [field]: value
            }
        })
    }
}