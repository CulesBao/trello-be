import ApiError from "../utils/ApiError.js"
import authService from '../service/auth.service.js'
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorHandlingMiddleware } from "../middleware/errorHandler.middleware.js";
import { responseOK } from "../interface/io.interface.js";

class authController{
    register = async(req: Request, res: Response) => {
        try{
            const response: responseOK = await authService.register(req.body)
            res.status(response.status).json({message: response.message})
        }
        catch(err){
            errorHandlingMiddleware(err, res)
        }
    }
    login = async(req: Request , res: Response) => {
        try{
            const response: responseOK = await authService.login(req.body)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch(err){
            errorHandlingMiddleware(err, res)
        }
    }
    get = async(req: Request, res: Response) => {
        try{
            const authorizationHeader: string | undefined = req.headers['authorization']
            if (!authorizationHeader)
                throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized')
            const token: string = authorizationHeader.split(' ')[1]
            const response: responseOK = await authService.get(token, req.params.id)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err){
            errorHandlingMiddleware(err, res)
        }
    }
    getAllUsers = async(req: Request, res: Response) => {
        try{
            const authorizationHeader: string | undefined = req.headers['authorization']
            if (!authorizationHeader)
                throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized')
            const token: string = authorizationHeader.split(' ')[1]
            const response: responseOK = await authService.get(token, 'all')
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err){
            errorHandlingMiddleware(err, res)
        }
    }
    deleteUser = async(req: Request, res: Response) => {
        try{
            const authorizationHeader: string | undefined = req.headers['authorization']
            if (!authorizationHeader)
                throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized')
            const token: string = authorizationHeader.split(' ')[1]
            const response: responseOK = await authService.deleteUser(token, req.params.id)
            res.status(response.status).json({
                message: response.message
            })
        }
        catch(err){
            errorHandlingMiddleware(err, res)
        }
    }
    updateUser = async(req: Request, res: Response) => {
        try{
            const authorizationHeader: string | undefined = req.headers['authorization']
            if (!authorizationHeader)
                throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized')
            const token: string = authorizationHeader.split(' ')[1]
            const response: responseOK = await authService.updateUser(token, req.body)
            res.status(response.status).json({
                message: response.message
            })
        }
        catch(err){
            errorHandlingMiddleware(err, res)
        }
    }
}

export default new authController()