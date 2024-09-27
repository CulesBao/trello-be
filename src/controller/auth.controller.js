import ApiError from "../utils/ApiError.js"
import authService from '../service/auth.service.js'

const callService = async (req, res, next, func) => {
    try{
        const {status, ...data} = await func(req.body, next)
        if (status >= 400)
            throw ApiError(status, data)
        res.status(status).json(data)
    }
    catch(err){
        next(err)
    }
}

const register = async(req, res, next) => {
    callService(req, res, next, authService.register)
}
const login = async(req, res, next) => {
    callService(req, res, next, authService.login)
}

export default {register, login}