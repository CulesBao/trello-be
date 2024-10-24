import { Request, Response, NextFunction } from "express";
import { usersSchema } from "./users.validator";

class authMiddleware {
    async loginValidation(req: Request, _: Response, next: NextFunction) {
        try {
            const loginData = req.body
            const { err } = await usersSchema.validateAsync(loginData)
            next()
        }
        catch (err: any) {
            next(err)
        }
    }
    async registerValidation(req: Request, _: Response, next: NextFunction) {
        try {
            const registerData = req.body;
            const { err } = await usersSchema.validateAsync(registerData)
            next()
        }
        catch (err: any) {
            next(err)
        }
    }
    async updateUser(req: Request, _: Response, next: NextFunction) {
        try {
            const userInput = req.body
            const { err } = await usersSchema.validateAsync(userInput)
            next()
        }
        catch (err: any) {
            next(err)
        }
    }
}

export default new authMiddleware()