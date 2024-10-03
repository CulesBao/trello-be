import {User, Role} from '../interface/db.interface.js'
import db from '../config/db.config.js'
import ApiError from '../utils/ApiError.js'
import hashUtils from '../utils/hash.utils.js'
import tokenUtils from '../utils/token.uitls.js'
import { StatusCodes } from 'http-status-codes'
import { responseOK } from '../interface/io.interface.js'
class authService{
    role = async(token: string, compareRole: string): Promise<boolean> => {
        try {
            const id: number = tokenUtils.verifyToken(token)
            const [isExistedUser]: [User[], any] = await db.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
            if (isExistedUser.length == 0)
                throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token')
            const roleId = isExistedUser[0].roleId
            const [isAdmin]: [Role[], any]= await db.pool.query(`SELECT * FROM roles WHERE id = ?`, [roleId])
            return isAdmin[0]?.roleName == compareRole
        } catch (err) {
            throw err
        }
    }
    register = async(info: User): Promise<responseOK> => {
        try {
            const { email, username, password, roleName } = info
            const [isExistedEmail]: [User[], any] = await db.pool.query(`SELECT * FROM users WHERE email = ?`, [email])
            if (isExistedEmail?.length > 0)
                throw new ApiError(StatusCodes.CONFLICT, "Email is already existed")
            const [isExistedUsername]: [User[], any] = await db.pool.query(`SELECT * FROM users WHERE username = ?`, [username])
            if (isExistedUsername?.length > 0)
                throw new ApiError(StatusCodes.CONFLICT, "Username is already existed")
            const [isExistedRole]: [Role[], any] = await db.pool.query(`SELECT id FROM roles WHERE roleName = ?`, [roleName])
            if (isExistedRole?.length == 0)
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Role name is invalid')
            const roleId = isExistedRole[0].id
            const hashPassword = await hashUtils.hashPassword(password)
            await db.pool.query(`INSERT INTO users (email, username, password, roleId) VALUES (?, ?, ?, ?)`, [email, username, hashPassword, roleId])
            return {
                status: StatusCodes.CREATED,
                message: "Register responseOKfully"
            }
        } catch (err) {
            throw err
        }
    }
    login = async(info: User): Promise<responseOK> => {
        try {
            const { username, password } = info
            const [isExistedUser]: [User[], any] = await db.pool.query(`SELECT * FROM users WHERE username = ?`, [username])
            if (!isExistedUser?.length)
                throw new ApiError(StatusCodes.UNAUTHORIZED, "Username or password incorrect!")
            if (!await hashUtils.comparePassword(password, isExistedUser[0].password))
                throw new ApiError(StatusCodes.UNAUTHORIZED, "Username or password incorrect!")
            const token:string = tokenUtils.generateToken(isExistedUser[0].id)
    
            return {
                status: StatusCodes.OK,
                message: "Login successfully",
                data: {token}
            }
        } catch (err) {
            throw err
        }
    }
    get = async(token: string, info: string): Promise<responseOK> => {
        try {
            if (info == 'me') {
                const id: number = tokenUtils.verifyToken(token)
                const [isExistedUser]: [User[], any] = await db.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
                if (isExistedUser?.length == 0)
                    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token')
                const { username, email, roleId } = isExistedUser[0]
                return {
                    status: StatusCodes.OK,
                    message: "Get succcessful",
                    data: { username, email, roleId }
                }
            }
            else if (info == 'all'){
                if (!(await this.role(token, 'admin')))
                    throw new ApiError(StatusCodes.FORBIDDEN, 'User must be admin to access this feature')
                const [isExistedUser]: [User[], any] = await db.pool.query(`SELECT id, username, email, roleId from users`)
                if (!(isExistedUser?.length))
                    throw new ApiError(StatusCodes.NOT_FOUND, 'Not found')
                return {
                    status: StatusCodes.OK,
                    message: "Get complete",
                    data: isExistedUser
                }
            }
            else{
               if (!(await this.role(token, 'admin')))
                   throw new ApiError(StatusCodes.FORBIDDEN, 'User must be admin to access this feature')
               const [isExistedUser]: [User[], any] = await db.pool.query(`SELECT id, username, email, roleId from users WHERE id = ?`, [info])
               if (!isExistedUser.length)
                   throw new ApiError(StatusCodes.NOT_FOUND, 'Id is invalid')
               return {
                   status: StatusCodes.OK,
                   message: "Get complete",
                   data: isExistedUser[0]
               }
            }
        } catch (err) {
            throw err
        }
    }
    deleteUser = async(token: string, info: string): Promise<responseOK> => {
        try{
            if (!(await this.role(token, 'admin')))
                throw new ApiError(StatusCodes.FORBIDDEN, 'User must be admin to access this feature')
            const id: string = info
            const [isExistedUser]: [User[], any] = await db.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
            if (!(isExistedUser?.length))
                throw new ApiError(StatusCodes.NOT_FOUND, 'Id is invalid')
            await db.pool.query(`DELETE FROM users WHERE id = ?`, [id])
            return{
                status: StatusCodes.OK,
                message: `Delete user where id = ${id} completed!`
            }
        }
        catch(err) {
            throw err
        }
    }
    updateUser = async(token: string, info: User): Promise<responseOK> => {
        try{
            const {username , password, email, roleName} = info
            const id: number = tokenUtils.verifyToken(token)
            const [isExistedUser]: [User[], any] = await db.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
            if (!(isExistedUser?.length))
                throw new ApiError(StatusCodes.NOT_FOUND, 'Id is invalid')
            const user: User = isExistedUser[0]
            const [isExistedRole] : [Role[], any] = await db.pool.query(`SELECT * FROM roles WHERE roleName = ?`, [roleName])
            if (!(isExistedRole?.length))
                throw(StatusCodes.BAD_REQUEST, "Rolename is invalid")
            const roleId: number = isExistedRole[0].id
            if (user.username != username || user.email != email || user.roleId != roleId)
                throw new ApiError(StatusCodes.FORBIDDEN, "Cannot change email or username or role")
            if (await hashUtils.comparePassword(password, user.password))
                throw new ApiError(StatusCodes.BAD_REQUEST, "New password must be different from current password")
            const hashPassword = await hashUtils.hashPassword(password)
            await db.pool.query(`UPDATE users SET password = ?`, [hashPassword])
            return {
                status: StatusCodes.ACCEPTED,
                message: "Update completed"
            }
        }
        catch(err) {
            throw err
        }
    }
}
export default new authService()