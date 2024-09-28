import ApiError from "../utils/ApiError.js"
import authService from '../service/auth.service.js'

class authController{
    register = async(req, res, next) => {
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
    login = async(req, res, next) => {
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
    get = async(req, res, next) => {
        try{
            const authorizationHeader = req.headers['authorization']
            const token = authorizationHeader.split(' ')[1]
            const {status, ...data} = await authService.get(token, req.params.id, next)
            if (status >= 400)
                throw new ApiError(status, data)
            res.status(status).json(data)
        }
        catch (err){
            next(err)
        }
    }
    getAllUsers = async(req, res, next) => {
        try{
            const authorizationHeader = req.headers['authorization']
            const token = authorizationHeader.split(' ')[1]
            const {status, ...data} = await authService.get(token, 'all', next)
            if (status >= 400)
                throw new ApiError(status, data)
            res.status(status).json(data)
        }
        catch (err){
            next(err)
        }
    }
    deleteUser = async(req, res, next) => {
        try{
            const authorizationHeader = req.headers['authorization']
            const token = authorizationHeader.split(' ')[1]
            const {status, ...data} = await authService.deleteUser(token, req.params.id, next)
            if (status >= 400)
                throw new ApiError(status, data)
            res.status(status).json(data)
        }
        catch(err){
            next(err)
        }
    }
    updateUser = async(req, res, next) => {
        try{
            const authorizationHeader = req.headers['authorization']
            const token = authorizationHeader.split(' ')[1]
            const {status, ...data} = await authService.updateUser(token, req.body, next)
            if (status >= 400)
                throw new ApiError(status, data)
            res.status(status).json(data)
        }
        catch(err){
            next(err)
        }
    }
}

export default new authController()