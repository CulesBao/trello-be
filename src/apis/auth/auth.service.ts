import { UserRolesInput } from './auth.interface'
import { CustomeSuccessfulResponse } from '../../interface/io.interface'
import hashUtils from '../../utils/hash.utils'
import tokenUtils from '../../utils/token.uitls'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../../utils/CustomError'
import { UserService } from './user.repository'
import { RoleSerivce } from '../roles/roles.repository'
import { User } from '../../entity/User'
import { Role } from '../../entity/Role'

class authService {
    private userService = new UserService()
    private roleService = new RoleSerivce()
    async register(userData: User): Promise<CustomeSuccessfulResponse> {
        try {
            const findByUsername = await this.userService.findByUsername(userData.username)
            const findByEmail = await this.userService.findByEmail(userData.email)
            if (findByUsername || findByEmail)
                throw new CustomError(StatusCodes.BAD_REQUEST, "Username or email existed")
            userData.password = await hashUtils.hashPassword(userData.password)
            await this.userService.createUser(userData)
            return new CustomeSuccessfulResponse(StatusCodes.CREATED, "Register successful")
        } catch (err) {
            throw err
        }
    }
    async login(loginData: User): Promise<CustomeSuccessfulResponse> {
        try {
            if (!loginData.username)
                throw new CustomError(StatusCodes.NOT_FOUND, "Cannot found username")
            const user = await this.userService.findByUsername(loginData.username)
            if (!user)
                throw new CustomError(StatusCodes.NOT_FOUND, "Wrong username or password")
            if (!await hashUtils.comparePassword(loginData.password, user.password))
                throw new CustomError(StatusCodes.NOT_FOUND, "Wrong username or password")

            const token = tokenUtils.generateToken(user.id)
            return new CustomeSuccessfulResponse(StatusCodes.OK, "Login successful", { token })
        } catch (err) {
            throw err
        }
    }
    async get(info: string, id: number): Promise<CustomeSuccessfulResponse> {
        try {
            if (info == 'me')
            {
                const user = await this.userService.findById(id)
                if (!user)
                    throw new CustomError(StatusCodes.NOT_FOUND, "User not found")
                return new CustomeSuccessfulResponse(StatusCodes.OK, "Get my infomation successful", user)
            }
            if (info == 'all') {
                const users = await this.userService.findAll()
                return new CustomeSuccessfulResponse(StatusCodes.OK, "Get all user successful", users)
            }
            else {
                const user = await this.userService.findById(Number(info))
                if (!user)
                    throw new CustomError(StatusCodes.NOT_FOUND, "User not found")
                return new CustomeSuccessfulResponse(StatusCodes.OK, "Get my infomation successful", user)
            }
        } catch (err) {
            throw err
        }
    }
    deleteUser = async (id: string): Promise<CustomeSuccessfulResponse> => {
        try {
            const user = await this.userService.findById(parseInt(id))
            if (!user)
                throw new CustomError(StatusCodes.NOT_FOUND, "User not found")
            if (user.roles[0]?.name == 'admin')
                throw new CustomError(StatusCodes.FORBIDDEN, "Cannot delete admin")
            await this.userService.delete(Number(id))
            return new CustomeSuccessfulResponse(StatusCodes.ACCEPTED, "Delete user successful")
        }
        catch (err) {
            throw err
        }
    }
    updateUser = async (userData: User, id: number): Promise<CustomeSuccessfulResponse> => {
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
            return new CustomeSuccessfulResponse(StatusCodes.ACCEPTED, "Update user successful")
        }
        catch (err) {
            throw err
        }
    }
    async assignRole(assignRole: UserRolesInput): Promise<CustomeSuccessfulResponse> {
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
            return new CustomeSuccessfulResponse(StatusCodes.CREATED, "Assign role successful")
        } catch (err) {
            throw err
        }
    }
}
export default new authService()