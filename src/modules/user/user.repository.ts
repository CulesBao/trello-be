import { Role } from '../roles/entity/Role';
import { User } from './entity/User';
import { baseRepository } from '../../template/base.repository';
import CustomError from '../../utils/CustomError';
import { StatusCodes } from 'http-status-codes';

export class UserService extends baseRepository<User> {
    public async findById(id: number): Promise<User> {
        const user: User | null = await this.repository.findOne({
            where: {
                id
            },
            relations: ['roles']
        })
        if (user == null)
            throw new CustomError(StatusCodes.NOT_FOUND, "Cannot find any user with this ID")
        return user
    }
    public async findForRegister(field: string, value: any): Promise<User | null> {
        const user = await this.repository.findOne({
            where: {
                [field]: value
            } as any,
            relations: ['roles']
        });
        return user;
    }
    public async findByUsername(username: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                username: String(username)
            },
            relations: ['roles']
        })
        if (user == null)
            throw new CustomError(StatusCodes.NOT_FOUND, "Cannot find any user match this key")
        return user
    }
    public async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findOne({
            where: {
                email: String(email)
            },
            relations: ['roles']
        })
        if (user == null)
            throw new CustomError(StatusCodes.NOT_FOUND, "Cannot find any user match this key")
        return user
    }
    public async assignRole(user: User, role: Role): Promise<void> {
        user.roles.push(role)
        await this.repository.save(user)
    }
}