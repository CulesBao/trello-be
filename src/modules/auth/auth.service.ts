import hashUtils from '../../common/utils/hash.utils'
import tokenUtils from '../../common/utils/token.uitls'
import { User } from '../user/User.entity'
import userService from '../user/user.repository'
import client from '../../config/redis.config'
import { BadRequest } from '../../handler/failed.handler'
import { MessageConstant } from '../../common/message.constants'
import userRepository from '../user/user.repository'

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
        const token = tokenUtils.generateToken(user.id)
        return token
    }
    public async googleService(profile: any): Promise<string> {
        const user: User | null = await userRepository.findByGoogleAccount(profile.emails[0].value)
        if (user) {
            return tokenUtils.generateToken(user.id)
        }

        const newUser: User = new User();
        newUser.email = profile.emails[0].value
        newUser.name = profile.displayName
        newUser.username = profile.emails[0].value
        newUser.password = process.env.DEFAULT_PASSWORD || ""
        newUser.isGoogleUser = true

        await this.register(newUser)

        const user1: User | null = await userRepository.findByGoogleAccount(profile.emails[0].value)
        if (user1) {
            return tokenUtils.generateToken(user1.id)
        }

        return ""
    }
}
export default new authService()