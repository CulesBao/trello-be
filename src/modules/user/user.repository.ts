import { Role } from '../roles/Role.entity';
import { User } from './User.entity';
import { baseRepository } from '../../common/base.repository';
import { NotFound } from '../../handler/failed.handler';
import { MessageConstant } from '../../common/constants/message.constants';

export class UserService extends baseRepository<User> {
    public override async findById(id: number): Promise<User> {
        const user: User | null = await this.repository.findOne({
            where: {
                id
            },
        })
        if (user == null)
            throw new NotFound(MessageConstant.User.NOT_FOUND)
        return user
    }
    public async findForRegister(field: string, value: any): Promise<User | null> {
        const user = await this.repository.findOne({
            where: {
                [field]: value
            } as any,
        })
        return user;
    }
    public async findByUsername(username: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                username: String(username)
            },
        })
        if (user == null)
            throw new NotFound(MessageConstant.User.NOT_FOUND)
        return user
    }
    public async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                email: String(email)
            },
        })
        if (user == null)
            throw new NotFound(MessageConstant.User.NOT_FOUND)
        return user
    }
    public async assignRole(user: User, role: Role): Promise<void> {
        user.roles.push(role)
        await this.repository.update(user.id, user)
    }
}