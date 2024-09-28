import ApiError from "../utils/ApiError.js"
import rolesService from '../service/roles.service.js'

class rolesController{
    createRole = async(req, res, next) => {
        try{
            const authorizationHeader = req.headers['authorization']
            const token = authorizationHeader.split(' ')[1]
            const {status, ...data} = await rolesService.createRole(token, req.body, next)
            if (status >= 400)
                throw ApiError(status, data)
            res.status(status).json(data)
        }
        catch(err){
            next(err)
        }
    }
    getAllRoles = async(req, res, next) => {
        try{
            const authorizationHeader = req.headers['authorization']
            const token = authorizationHeader.split(' ')[1]
            const {status, ...data} = await rolesService.getAllRoles(token, next)
            if (status >= 400)
                throw ApiError(status, data)
            res.status(status).json(data)
        }
        catch(err){
            next(err)
        }
    }
}

export default new rolesController()