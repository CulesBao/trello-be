import { CustomeSuccessfulResponse } from '../../interface/io.interface';
import authService from './auth.service'
import { NextFunction, Request, Response } from "express";

class authController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomeSuccessfulResponse = await authService.register(req.body)
            res.status(response.status).json({ message: response.message })
        }
        catch (err: any) {
            next(err)
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomeSuccessfulResponse = await authService.login(req.body)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err: any) {
            console.log('err', err);
            next(err);
        }
    }
    async get(req: any, res: Response, next: NextFunction) {
        try {
            const info = (req.params.id) ? req.params.id : 'all'
            const id = req.id
            const response: CustomeSuccessfulResponse = await authService.get(info, id)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    async getMe(req: any, res: Response, next: NextFunction) {
        try {
            const response: CustomeSuccessfulResponse = await authService.get('me', req.id)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    async getAll(req: any, res: Response, next: NextFunction) {
        try {
            const response: CustomeSuccessfulResponse = await authService.get('all', req.id)
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
            const response: CustomeSuccessfulResponse = await authService.deleteUser(req.params.id)
            res.status(response.status).json({
                message: response.message
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    async updateUser(req: any, res: Response, next: NextFunction) {
        try {
            const response: CustomeSuccessfulResponse = await authService.updateUser(req.body, req.id)
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
            const response: CustomeSuccessfulResponse = await authService.assignRole(req.body)
            res.status(response.status).json({
                message: response.message
            })
        }
        catch (err: any) {
            next(err)
        }
    }
}

export default new authController()