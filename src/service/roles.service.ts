import db from '../config/db.config.js'
import ApiError from '../utils/ApiError.js'
import tokenUitls from '../utils/token.uitls.js'
import { User, Role } from '../interface/db.interface.js'
import { responseOK } from '../interface/io.interface.js'
import { StatusCodes } from 'http-status-codes'
class rolesService{
    role = async(token: string , compareRole: string) : Promise<boolean> => {
        try{
            const id:number = tokenUitls.verifyToken(token)
            const [isExistedUser] : [User[], any] = await db.pool.query(`SELECT * FROM users WHERE id = ?`, [id])
            if (isExistedUser?.length == 0)
                throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token')
            const roleId = isExistedUser[0].roleId
            const [isAdmin] : [User[], any] = await db.pool.query(`SELECT * FROM roles WHERE id = ?`, [roleId])
    
            return isAdmin[0]?.roleName == compareRole
        }
        catch(err){
            throw err
        }
    }
    createRole = async(token: string , info: {roleName: string}): Promise<responseOK> => {
        try{
            const {roleName} = info
            const isAdmin : boolean = await this.role(token, 'admin')
            if (!isAdmin)
                throw new ApiError(StatusCodes.FORBIDDEN, 'User must be admin to access this feature!')
            const [isExistedRoleName]: [Role[], any] = await db.pool.query(`SELECT * FROM roles WHERE roleName = ?`, [roleName])
            if (isExistedRoleName?.length > 0)
                throw new ApiError(StatusCodes.BAD_REQUEST, 'Role name is already existed')
            await db.pool.query(`INSERT INTO roles(roleName) values (?)`, [roleName])
            return {
                status: 201,
                message: 'Create role completed'
            }
        }
        catch(err){
            throw err
        }
    }
    getAllRoles = async(token: string) : Promise<responseOK> => {
        try{
            const isAdmin : boolean = await this.role(token, 'admin')
            if (!isAdmin)
                throw new ApiError(StatusCodes.FORBIDDEN, 'User must be admin to access this feature!')
            const [roles]: [Role[], any] = await db.pool.query(`SELECT * FROM roles`)
            return {
                status: StatusCodes.OK,
                message: 'Get success',
                data: roles
            }
        }
        catch(err) {
            throw err
        }
    }
}
export default new rolesService()