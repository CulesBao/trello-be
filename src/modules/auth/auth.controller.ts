import { Created, OK } from '../../handler/success.handler';
import authService from './auth.service'
import { NextFunction, Request, Response } from "express";

class authController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            await authService.register(req.body)
            new Created(res, "User created successfully")
        }
        catch (err: any) {
            next(err)
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token : String = await authService.login(req.body)
            new OK(res, "User logged in successfully", {token})
        }
        catch (err: any) {
            next(err);
        }
    }
}

export default new authController()