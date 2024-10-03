import ApiError from "../utils/ApiError.js";
import { Request, Response, NextFunction } from "express";
import { usersSchema } from "../schema/users.schema.js";
import { StatusCodes } from "http-status-codes";
import { errorHandlingMiddleware } from "./errorHandler.middleware.js";

class authMiddleware {
    loginValidation = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const {username, password} = req.body;
            const {err} = await usersSchema.validateAsync({username, password})
            if (err)
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, err)
            next()
        }
        catch(err) {
            errorHandlingMiddleware(err, res)
        }
    }
    registerValidation = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const {username, password, email, roleName} = req.body;
            const {err} = await usersSchema.validateAsync({username, password, email, roleName})
            if (err)
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, err)
            next()
        }
        catch(err) {
            errorHandlingMiddleware(err, res)
        }
    }
    updateUser = async(req: Request, res: Response, next: NextFunction) => {
        try{
            const {username, password, email, roleName} = req.body
            const {err} = await usersSchema.validateAsync({username, password, email, roleName})
            if (err)
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, err)
            next()
        }
        catch(err){
            errorHandlingMiddleware(err, res)
        }
    }
}

export default new authMiddleware()