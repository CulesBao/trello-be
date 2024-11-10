import { CustomSuccessfulResponse } from '../../template/response.dto';
import authService from './auth.service'
import { NextFunction, Request, Response } from "express";

class authController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomSuccessfulResponse = await authService.register(req.body)
            res.status(response.status).json({ message: response.message })
        }
        catch (err: any) {
            next(err)
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomSuccessfulResponse = await authService.login(req.body)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        }
        catch (err: any) {
            next(err);
        }
    }
}

export default new authController()