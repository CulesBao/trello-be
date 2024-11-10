import { CustomSuccessfulResponse } from "../../template/response.dto";
import { UserService } from './user.repository'
import { RoleSerivce } from '../roles/roles.repository'
import CustomError from '../../utils/CustomError'
import { User } from '../user/entity/User'
import { Role } from '../roles/entity/Role'
import { StatusCodes } from "http-status-codes";
import hashUtils from '../../utils/hash.utils'
import { UserRolesInput } from "./dto/user.dto";

class userService {
    private userService = new UserService()
    private roleService = new RoleSerivce()
    async get(info: string, id: number): Promise<CustomSuccessfulResponse> {
        try {
            if (info == 'me') {
                const user = await this.userService.findById(id)
                if (!user)
                    throw new CustomError(StatusCodes.NOT_FOUND, "User not found")
                return new CustomSuccessfulResponse(StatusCodes.OK, "Get my infomation successful", user)
            }
            if (info == 'all') {
                const users = await this.userService.findAll()
                return new CustomSuccessfulResponse(StatusCodes.OK, "Get all user successful", users)
            }
            else {
                const user = await this.userService.findById(Number(info))
                if (!user)
                    throw new CustomError(StatusCodes.NOT_FOUND, "User not found")
                return new CustomSuccessfulResponse(StatusCodes.OK, "Get my infomation successful", user)
            }
        } catch (err) {
            throw err
        }
    }
    deleteUser = async (id: string): Promise<CustomSuccessfulResponse> => {
        try {
            const user = await this.userService.findById(parseInt(id))
            if (!user)
                throw new CustomError(StatusCodes.NOT_FOUND, "User not found")
            if (user.roles[0]?.name == 'admin')
                throw new CustomError(StatusCodes.FORBIDDEN, "Cannot delete admin")
            await this.userService.delete(Number(id))
            return new CustomSuccessfulResponse(StatusCodes.ACCEPTED, "Delete user successful")
        }
        catch (err) {
            throw err
        }
    }
    updateUser = async (userData: User, id: number): Promise<CustomSuccessfulResponse> => {
        try {
            const { name, username, email, password } = userData
            const user = await this.userService.findById(id)
            if (!user)
                throw new CustomError(StatusCodes.NOT_FOUND, "User not found")
            if (name == undefined || username == undefined || email == undefined || password == undefined)
                throw new CustomError(StatusCodes.BAD_REQUEST, "Cannot ignore any field")
            if (username != user.username && email != user.email)
                throw new CustomError(StatusCodes.BAD_REQUEST, "Cannot change username or email")
            userData.password = await hashUtils.hashPassword(password)
            await this.userService.update(id, userData)
            return new CustomSuccessfulResponse(StatusCodes.ACCEPTED, "Update user successful")
        }
        catch (err) {
            throw err
        }
    }
    async assignRole(assignRole: UserRolesInput): Promise<CustomSuccessfulResponse> {
        try {
            const { userId, roleId } = assignRole
            const user = await this.userService.findById(userId)
            if (!user)
                throw new CustomError(StatusCodes.NOT_FOUND, "User not found")
            const role = await this.roleService.findById(roleId)
            if (!role)
                throw new CustomError(StatusCodes.NOT_FOUND, "Role not found")
            user.roles?.forEach((value: Role) => {
                if (value.id == roleId)
                    throw new CustomError(StatusCodes.BAD_REQUEST, "User is already has this role")
            })
            await this.userService.assignRole(user, role)
            return new CustomSuccessfulResponse(StatusCodes.CREATED, "Assign role successful")
        } catch (err) {
            throw err
        }
    }
}

export default new userService()