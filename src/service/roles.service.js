import db from '../config/db.config.js'
import ApiError from '../utils/ApiError.js'
import tokenUitls from '../utils/token.uitls.js'
const role = async(token, compareRole, next) => {
    try{
        const id = tokenUitls.verifyToken(token, next)
        const [isExistedUser] = await db.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
        if (isExistedUser?.length == 0)
            throw new ApiError(400, 'Invalid token')
        const roleId = isExistedUser[0].roleId
        const [isAdmin] = await db.pool.query(`SELECT * FROM roles WHERE id = ?`, [roleId])

        return isAdmin[0]?.roleName == compareRole
    }
    catch(err){
        next(err)
    }
}

const createRole = async(token, info, next) => {
    try{
        const {roleName} = info
        const isAdmin = await role(token, 'admin', next)
        if (!isAdmin)
            throw new ApiError(400, 'User must be admin to access this feature!')
        const [isExistedRoleName] = await db.pool.query(`SELECT * FROM roles WHERE roleName = ?`, [roleName])
        if (isExistedRoleName?.length > 0)
            throw new ApiError(400, 'Role name is already existed')
        await db.pool.query(`INSERT INTO roles(roleName) values (?)`, [roleName])
        return {
            status: 201,
            message: 'Create role completed'
        }
    }
    catch(err){
        next(err)
    }
}

const getAllRoles = async(token, next) => {
    try{
        const isAdmin = await role(token, 'admin', next)
        if (!isAdmin)
            throw new ApiError(400, 'User must be admin to access this feature!')
        const [roles] = await db.pool.query(`SELECT * FROM roles`)
        return {
            status: 200,
            message: 'Get successful',
            data: roles
        }
    }
    catch(err) {
        next(err)
    }
}

export default {createRole, getAllRoles}