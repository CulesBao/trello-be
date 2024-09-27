import ApiError from "../utils/ApiError.js"
import authService from '../service/auth.service.js'

const register = async(req, res, next) => {
    try{
        const {status, ...data} = await authService.register(req.body, next)
        if (status >= 400)
            throw ApiError(status, data)
        res.status(status).json(data)
    }
    catch(err){
        next(err)
    }
}
const login = async(req, res, next) => {
    try{
        const {status, ...data} = await authService.login(req.body, next)
        if (status >= 400)
            throw ApiError(status, data)
        res.status(status).json(data)
    }
    catch(err){
        next(err)
    }
}

export default {register, login}