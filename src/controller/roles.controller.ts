import ApiError from "../utils/ApiError.js"
import rolesService from '../service/roles.service.js'
import { NextFunction, Request, Response } from "express"
import { responseOK } from "../interface/io.interface.js"
import { errorHandlingMiddleware } from "../middleware/errorHandler.middleware.js"

class rolesController{
    createRole = async(req: Request, res: Response) => {
        try{
            const authorizationHeader: string | undefined = req.headers['authorization']
            if (!authorizationHeader)
                throw new ApiError(401, 'Unauthorized')
            const token: string = authorizationHeader.split(' ')[1]
            const response : responseOK = await rolesService.createRole(token, req.body)
            res.status(response.status).json(response.message)
        }
        catch(err){
            errorHandlingMiddleware(err, res)
        }
    }
    getAllRoles = async(req: Request, res: Response) => {
        try{
            const authorizationHeader: string | undefined = req.headers['authorization']
            if (!authorizationHeader)
                throw new ApiError(401, 'Unauthorized')
            const token: string = authorizationHeader.split(' ')[1]
            const response: responseOK = await rolesService.getAllRoles(token)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch(err){
            errorHandlingMiddleware(err, res)
        }
    }
}

export default new rolesController()