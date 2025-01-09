import { Created, OK } from '../../handler/success.handler';
import { User } from '../user/User.entity';
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
            const token: String = await authService.login(req.body)
            new OK(res, "User logged in successfully", { token })
        }
        catch (err: any) {
            next(err);
        }
    }
    public async googleService(profile: any): Promise<string> {
        try {
            return await authService.googleService(profile)
        } catch (err) {
            throw err;
        }
    }
    public async googleLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.user as string;
            res.redirect(`http://127.0.0.1:5500/src/public/notification.html?token=${token}`);
        } catch (err: unknown) {
            next(err);
        }
    }
}

export default new authController()