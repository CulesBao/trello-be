import { CustomSuccessfulResponse } from "../../template/response.dto";
import userService from './user.service'
import { NextFunction, Request, Response } from "express";

class userController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const info = (req.params.id) ? req.params.id : 'all'
            const id = Number(req.id)
            const response: CustomSuccessfulResponse = await userService.get(info, id)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomSuccessfulResponse = await userService.get('me', Number(req.id))
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomSuccessfulResponse = await userService.get('all', Number(req.id))
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomSuccessfulResponse = await userService.deleteUser(req.params.id)
            res.status(response.status).json({
                message: response.message
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomSuccessfulResponse = await userService.updateUser(req.body, Number(req.id))
            res.status(response.status).json({
                message: response.message
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    async assignRole(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomSuccessfulResponse = await userService.assignRole(req.body)
            res.status(response.status).json({
                message: response.message
            })
        }
        catch (err: any) {
            next(err)
        }
    }
}

export default new userController()