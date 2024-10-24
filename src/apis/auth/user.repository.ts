import { AppDataSource } from '../../config/data-source';
import { Role } from '../../entity/Role';
import { User } from '../../entity/User';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    public async createUser(userData: User): Promise<void> {
        const newUser = this.userRepository.create(userData)
        await this.userRepository.save(newUser)
    }
    public async findById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {
                id: Number(id),
            },
            relations: ['roles']
        })
    }
    public async findByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {
                username: String(username)
            },
            relations: ['roles']
        })
    }
    public async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {
                email: String(email)
            },
            relations: ['roles']
        })
    }
    public async findAll(): Promise<User[] | null> {
        return await this.userRepository.find({
            select: ['id', 'username', 'email', 'roles'],
            relations: ['roles']
        })
    }
    public async delete(id: number): Promise<void> {
        await this.userRepository.delete({ id: Number(id) })
    }
    public async update(id: number, userData: Partial<User>): Promise<void> {
        await this.userRepository.update({ id: Number(id) }, userData)
    }
    public async assignRole(user: User, role: Role): Promise<void>{
        user.roles.push(role)
        await this.userRepository.save(user)
    }
}