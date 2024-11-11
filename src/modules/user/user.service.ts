import { CustomSuccessfulResponse } from "../../template/response.dto";
import { UserService } from './user.repository'
import { RoleSerivce } from '../roles/roles.repository'
import CustomError from '../../utils/CustomError'
import { User } from '../user/entity/User'
import { Role } from '../roles/entity/Role'
import { StatusCodes } from "http-status-codes";
import hashUtils from '../../utils/hash.utils'
import { AssignRoleDTO } from "./dto/user.dto";

class userService {
    private userService = new UserService(User)
    private roleService = new RoleSerivce(Role)
    async get(info: string, id: number): Promise<CustomSuccessfulResponse> {
        if (info == 'me') {
            const user = await this.userService.findById(id)
            return new CustomSuccessfulResponse(StatusCodes.OK, "Get my infomation successful", user)
        }
        if (info == 'all') {
            const users = await this.userService.findAll()
            return new CustomSuccessfulResponse(StatusCodes.OK, "Get all user successful", users)
        }
        else {
            const user = await this.userService.findById(Number(info))
            return new CustomSuccessfulResponse(StatusCodes.OK, "Get my infomation successful", user)
        }
    }
    deleteUser = async (id: string): Promise<CustomSuccessfulResponse> => {
        const user = await this.userService.findById(parseInt(id))
        if (user.roles[0]?.name == 'admin')
            throw new CustomError(StatusCodes.FORBIDDEN, "Cannot delete admin")
        await this.userService.delete(Number(id))
        return new CustomSuccessfulResponse(StatusCodes.ACCEPTED, "Delete user successful")
    }
    updateUser = async (userData: User, id: number): Promise<CustomSuccessfulResponse> => {
        const { name, username, email, password } = userData
        const user = await this.userService.findById(id)
        if (username != user.username && email != user.email)
            throw new CustomError(StatusCodes.BAD_REQUEST, "Cannot change username or email")
        userData.password = await hashUtils.hashPassword(password)
        await this.userService.update(id, userData)
        return new CustomSuccessfulResponse(StatusCodes.ACCEPTED, "Update user successful")
    }
    async assignRole(assignRole: AssignRoleDTO): Promise<CustomSuccessfulResponse> {
        const { userId, roleId } = assignRole
        const user = await this.userService.findById(userId)
        const role = await this.roleService.findById(roleId)
        user.roles?.forEach((value: Role) => {
            if (value.id == roleId)
                throw new CustomError(StatusCodes.BAD_REQUEST, "User is already has this role")
        })
        await this.userService.assignRole(user, role)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, "Assign role successful")
    }
    async removeRole(removeRole: AssignRoleDTO): Promise<CustomSuccessfulResponse> {
        const { userId, roleId } = removeRole
        const user = await this.userService.findById(userId)
        await this.roleService.findById(roleId)
        user.roles?.forEach((value: Role) => {
            if (value.id == roleId) {
                user.roles?.splice(user.roles.indexOf(value), 1)
                this.userService.update(user.id, user)
                return new CustomSuccessfulResponse(StatusCodes.ACCEPTED, "Remove role successful")
            }
        })
        throw new CustomError(StatusCodes.BAD_REQUEST, "User does not have this role")
    }
}

export default new userService()