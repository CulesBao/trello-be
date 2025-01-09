import { Request, Response, NextFunction } from "express";
import { RegisterDTO } from "./auth.schema";
import { baseMiddleware } from "../../middleware/base.middleware";
import authController from "./auth.controller";

class authMiddleware extends baseMiddleware {
    public loginValidation(_: Request, __: Response, next: NextFunction) {
        next()
    }
    public registerValidation = this.validateSchema(RegisterDTO)
    public googleService = async (_: string, __: string, profile: any, cb: any) => {
        const token: string = await authController.googleService(profile)
        if (token == "")
            return cb(null, false)
        else
            return cb(null, token)
    }
}

export default new authMiddleware()