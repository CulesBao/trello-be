import hashUtils from '../../common/utils/hash.utils'
import tokenUtils from '../../common/utils/token.uitls'
import { User } from '../user/User.entity'
import userService from '../user/user.repository'
import client from '../../config/redis.config'
import { BadRequest } from '../../handler/failed.handler'
import { MessageConstant } from '../../common/message.constants'

class authService {
    async register(userData: User): Promise<void> {
        const findByUsername = await userService.findForRegister('username', userData.username)
        const findByEmail = await userService.findForRegister('email', userData.email)
        if (findByUsername || findByEmail)
            throw new BadRequest(MessageConstant.User.EXISTED)
        userData.password = await hashUtils.hashPassword(userData.password)
        await userService.create(userData)
    }
    async login(loginData: User): Promise<string> {
        const user = await userService.findForRegister('username', loginData.username)
        if (user == null || !await hashUtils.comparePassword(loginData.password, user.password))
            throw new BadRequest(MessageConstant.User.INVALID)
        client.set('logger', JSON.stringify(user))
        const token = tokenUtils.generateToken(user.id)
        return token
    }
}
export default new authService()