import ApiError from "../utils/ApiError.js";
import { usersSchema } from "../schema/users.schema.js";
import { StatusCodes } from "http-status-codes";

class authMiddleware {
    loginValidation = async(req, res, next) => {
        try{
            const {username, password} = req.body;
            const {err} = await usersSchema.validateAsync({username, password})
            if (err)
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, err)
            next()
        }
        catch(err) {
            next(err)
        }
    }
    registerValidation = async(req, res, next) => {
        try{
            const {username, password, email, roleName} = req.body;
            const {err} = await usersSchema.validateAsync({username, password, email, roleName})
            if (err)
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, err)
            next()
        }
        catch(err) {
            next(err)
        }
    }
    updateUser = async(req, res, next) => {
        try{
            const {username, password, email, roleName} = req.body
            const {err} = await usersSchema.validateAsync({username, password, email, roleName})
            if (err)
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, err)
            next()
        }
        catch(err){
            next(err)
        }
    }
}

export default new authMiddleware()
// const 
// export default {loginValidation, registerValidation, updateUser}