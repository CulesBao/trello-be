import { Request, Response, NextFunction } from "express";
import { LoginDTO } from "./dto/auth.dto";
import { validate } from "class-validator";
import CustomError from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";

class authMiddleware {
    async loginValidation(req: Request, _: Response, next: NextFunction) {
        try {
            const loginData: LoginDTO = req.body;
            
            return validate(loginData).then((errs) => {
                if (errs.length > 0) {
                    throw new CustomError(StatusCodes.NOT_ACCEPTABLE, "Failed!");
                }
                next();
            })
        }
        catch (err: any) {
            next(err)
        }
    }
    async registerValidation(req: Request, _: Response, next: NextFunction) {
        try {
            next()
        }
        catch (err: any) {
            next(err)
        }
    }
}

export default new authMiddleware()