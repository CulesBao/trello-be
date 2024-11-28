import { baseRepository } from '../../common/base.repository'
import { Permission } from '../permissions/Permission.entity';
import { Role } from './Role.entity';
import { NotFound } from '../../handler/failed.handler';
import { MessageConstant } from '../../common/constants/message.constants';

class roleRepository extends baseRepository<Role> {
    public override async findById(id: number): Promise<Role> {
        const role = await this.repository.findOne({
            where: {
                id: id,
            },
            relations: ['permissions']
        })
        if (!role){
            console.log('role', role)
            throw new NotFound(MessageConstant.Role.INVALID_ROLE)
        }
        return role
    }
    public async findByName(name: string): Promise<Role> {
        const role: Role | null = await this.repository.findOne({
            where: {
                name: String(name)
            },
            relations: ['permissions']
        })
        if (!role)
            throw new NotFound(MessageConstant.Role.INVALID_ROLE)
        return role
    }
    public async findForCreate(name: string): Promise<Role | null> {
        return await this.repository.findOne({
            where: {
                name: name
            }
        })
    }
    public override async findAll(): Promise<Role[]> {
        return await this.repository.find({
            relations: ['permissions']
        })
    }
    public async assignPermission(role: Role, permission: Permission): Promise<void> {
        role.permissions.push(permission)
        await super.update(role.id, role)
    }
}
export default new roleRepository(Role)