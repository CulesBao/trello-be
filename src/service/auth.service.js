import db from '../config/db.config.js'
import ApiError from '../utils/ApiError.js'
import hashUtils from '../utils/hash.utils.js'
import tokenUtils from '../utils/token.uitls.js'
import { StatusCodes } from 'http-status-codes'

class authService{
    role = async(token, compareRole, next) => {
        try {
            const id = tokenUtils.verifyToken(token, next)
            const [isExistedUser] = await db.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
            if (isExistedUser?.length == 0)
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid token')
            const roleId = isExistedUser[0].roleId
            const [isAdmin] = await db.pool.query(`SELECT * FROM roles WHERE id = ?`, [roleId])
    
            return isAdmin[0]?.roleName == compareRole
        } catch (err) {
            next(err)
        }
    }
    register = async(info, next) => {
        try {
            const { email, username, password, roleName } = info
            const [isExistedEmail] = await db.pool.query(`SELECT * FROM users WHERE email = ?`, [email])
            if (isExistedEmail?.length > 0)
                throw new ApiError(StatusCodes.BAD_REQUEST, "Email is already existed")
            const [isExistedUsername] = await db.pool.query(`SELECT * FROM users WHERE username = ?`, [username])
            if (isExistedUsername?.length > 0)
                throw new ApiError(StatusCodes.BAD_REQUEST, "Username is already existed")
            const [isExistedRole] = await db.pool.query(`SELECT id FROM roles WHERE roleName = ?`, [roleName])
            if (isExistedRole?.length == 0)
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Role name is invalid')
            const roleId = isExistedRole[0].id
            const hashPassword = await hashUtils.hashPassword(password)
            await db.pool.query(`INSERT INTO users (email, username, password, roleId) VALUES (?, ?, ?, ?)`, [email, username, hashPassword, roleId])
            return {
                status: StatusCodes.CREATED,
                message: "Register successfully"
            }
        } catch (err) {
            next(err)
        }
    }
    login = async(info, next) => {
        try {
            const { username, password } = info
            const [isExistedUser] = await db.pool.query(`SELECT * FROM users WHERE username = ?`, [username])
            if (!isExistedUser?.length > 0)
                throw new ApiError(StatusCodes.BAD_REQUEST, "Username or password incorrect!")
            if (!await hashUtils.comparePassword(password, isExistedUser[0].password))
                throw new ApiError(StatusCodes.BAD_REQUEST, "Username or password incorrect!")
            const token = tokenUtils.generateToken(isExistedUser[0].id)
    
            return {
                status: StatusCodes.OK,
                message: "Login successfully",
                token: token
            }
        } catch (err) {
            next(err)
        }
    }
    get = async(token, info, next) => {
        try {
            if (info == 'me') {
                const id = tokenUtils.verifyToken(token, next)
                const [isExistedUser] = await db.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
                if (isExistedUser?.length == 0)
                    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid token')
                const { username, email, roleId } = isExistedUser[0]
                console.log(info)
                return {
                    status: StatusCodes.OK,
                    message: "Get successful",
                    data: { username, email, roleId }
                }
            }
            else if (info == 'all'){
                if (!await role(token, 'admin', next))
                    throw new ApiError(StatusCodes.UNAUTHORIZED, 'User must be admin to access this feature')
                const [isExistedUser] = await db.pool.query(`SELECT id, username, email, roleId from users`)
                if (!isExistedUser.length)
                    throw new ApiError(StatusCodes.NOT_FOUND, 'Not found')
                return {
                    status: StatusCodes.ACCEPTED,
                    message: "Get complete",
                    data: isExistedUser
                }
            }
            else{
               if (!await role(token, 'admin', next))
                   throw new ApiError(StatusCodes.UNAUTHORIZED, 'User must be admin to access this feature')
               const [isExistedUser] = await db.pool.query(`SELECT id, username, email, roleId from users WHERE id = ?`, [info])
               if (!isExistedUser.length)
                   throw new ApiError(StatusCodes.NOT_FOUND, 'Id is invalid')
               return {
                   status: StatusCodes.ACCEPTED,
                   message: "Get complete",
                   data: isExistedUser[0]
               }
            }
        } catch (err) {
            next(err)
        }
    }
    deleteUser = async(token, info, next) => {
        try{
            if (!await role(token, 'admin', next))
                throw new ApiError(StatusCodes.UNAUTHORIZED, 'User must be admin to access this feature')
            const id = info
            const [isExistedUser] = await db.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
            if (!isExistedUser.length)
                throw new ApiError(StatusCodes.NOT_FOUND, 'Id is invalid')
            await db.pool.query(`DELETE FROM users WHERE id = ?`, [id])
            return{
                status: StatusCodes.OK,
                message: `Delete user where id = ${id} completed!`
            }
        }
        catch(err) {
            next(err)
        }
    }
    updateUser = async(token, info, next) => {
        try{
            const id = tokenUtils.verifyToken(token, next)
            const [isExistedUser] = await db.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
            if (!isExistedUser.length)
                throw new ApiError(StatusCodes.NOT_FOUND, 'Id is invalid')
            const user = isExistedUser[0]
            const [isExistedRole] = await db.pool.query(`SELECT * FROM roles WHERE roleName = ?`, [info.roleName])
            if (!isExistedRole.length)
                throw(StatusCodes.NOT_FOUND, "Rolename is invalid")
            const roleId = isExistedRole[0].id
            if (user.username != info.username || user.email != info.email || user.roleId != roleId)
                throw new ApiError(StatusCodes.FORBIDDEN, "Cannot change email or username or role")
            if (await hashUtils.comparePassword(info.password, user.password))
                throw new ApiError(StatusCodes.BAD_REQUEST, "New password must be different from current password")
            const hashPassword = await hashUtils.hashPassword(info.password)
            await db.pool.query(`UPDATE users SET password = ?`, [hashPassword])
            return {
                status: StatusCodes.ACCEPTED,
                message: "Update completed"
            }
        }
        catch(err) {
            next(err)
        }
    }
}
export default new authService()