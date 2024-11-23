import { StatusCodes } from 'http-status-codes'
import CustomError from '../middleware/CustomError'
import { UserService } from '../modules/user/user.repository'
import { User } from '../modules/user/User.entity'
import { Role } from '../modules/roles/Role.entity'
import { Permission } from '../modules/permissions/Permission.entity'
import { AppDataSource } from '../config/data-source'

const userRepository = AppDataSource.getRepository(User)
class roles {
    private userService = new UserService(User)
    async userRoles(id: number): Promise<string[]> {
        try {
            const user = await this.userService.findById(id)
            if (!user)
                throw new CustomError(StatusCodes.NOT_FOUND, "User not found")
            if (user.roles?.length == 0)
                throw new CustomError(StatusCodes.NOT_FOUND, 'User does not exist any role')
            return user.roles?.map((role: Role) => role.name)
        } catch (err) {
            throw err
        }
    }
    async userPermissions(id: number): Promise<Array<string>> {
        try {
            const userPermisison = await userRepository.findOne({
                where: { id },
                relations: ['roles', 'roles.permissions']
            })
            if (!userPermisison)
                throw new CustomError(StatusCodes.NOT_FOUND, 'User does not exist any permission')
            const permission = userPermisison.roles?.map((role: Role) => role.permissions?.map((permission: Permission) => permission.name))
            return permission.flat()
        } catch (err) {
            throw err
        }
    }
}

export default new roles()