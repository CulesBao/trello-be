import db from '../config/db.config.js'
import ApiError from '../utils/ApiError.js'
import hashUtils from '../utils/hash.utils.js'
import tokenUtils from '../utils/token.uitls.js'
const register = async(info, next) => {
    try{
        const {email, username, password, roleName} = info
        const [isExistedEmail] = await db.pool.query(`SELECT * FROM users WHERE email = ?`, [email])
        if (isExistedEmail?.length > 0)
            throw new ApiError(400, "Email is already exitest")
        const [isExistedUsername] = await db.pool.query(`SELECT * FROM users WHERE username = ?`, [username])
        if (isExistedUsername?.length > 0)
            throw new ApiError(400, "Username is already exitest")
        const [isExistedRole] = await db.pool.query(`SELECT id FROM roles WHERE roleName = ?`, [roleName])
        if (isExistedRole?.length == 0)
            throw new ApiError(400, 'Role name is invalid')
        const roleId = isExistedRole[0].id
        const hashPassword = await hashUtils.hashPassword(password)
        await db.pool.query(`INSERT INTO users (email, username, password, roleId) VALUES (?, ?, ?, ?)`, [email, username, hashPassword, roleId])
        return {
            status: 201, 
            message: "Register successfully"
        } 
    }
    catch(err){
        next(err)
    }
}
const login = async(info, next) => {
    try{
        const {username, password} = info
        const [isExistedUser] = await db.pool.query(`SELECT * FROM users WHERE username = ?`, [username])
        if (!isExistedUser?.length > 0)
            throw new ApiError(400, "Username or password incorrect!")
        if (!await hashUtils.comparePassword(password, isExistedUser[0].password))
            throw new ApiError(400, "Username or password incorrect!")
        const token = tokenUtils.generateToken(isExistedUser[0].id)

        return {
            status: 200, 
            message: "Login successfully",
            token: token
        } 
    }
    catch(err){
        next(err)
    }
}

export default {login, register}