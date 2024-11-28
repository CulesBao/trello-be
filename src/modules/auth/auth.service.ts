import { CustomSuccessfulResponse } from '../../middleware/successResponse.middleware'
import hashUtils from '../../common/utils/hash.utils'
import tokenUtils from '../../common/utils/token.uitls'
import { StatusCodes } from 'http-status-codes'
import CustomError from '../../middleware/CustomError'
import { User } from '../user/User.entity'
import userService  from '../user/user.repository'
import client from '../../config/redis.config'

class authService {
    async register(userData: User): Promise<CustomSuccessfulResponse> {
        const findByUsername = await userService.findForRegister('username', userData.username)
        const findByEmail = await userService.findForRegister('email', userData.email)
        if (findByUsername || findByEmail)
            throw new CustomError(StatusCodes.BAD_REQUEST, "Username or email existed")
        userData.password = await hashUtils.hashPassword(userData.password)
        await userService.create(userData)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, "Register successful")
    }
    async login(loginData: User): Promise<CustomSuccessfulResponse> {
        const user = await userService.findForRegister('username', loginData.username)
        if (user == null || !await hashUtils.comparePassword(loginData.password, user.password))
            throw new CustomError(StatusCodes.NOT_FOUND, "Wrong username or password")
        client.set('logger', JSON.stringify(user))
        const token = tokenUtils.generateToken(user.id)
        return new CustomSuccessfulResponse(StatusCodes.OK, "Login successful", { token })
    }
}
export default new authService()