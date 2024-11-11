import { Request, Response, NextFunction } from "express";
import { LoginDTO, RegisterDTO } from "./dto/auth.dto";
import CustomError from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";

class authMiddleware {
    async loginValidation(req: Request, _: Response, next: NextFunction) {
        try{
            next();
        }
        catch(err){
            next(err)
        }
    }
    async registerValidation(req: Request, _: Response, next: NextFunction) {
        try {
            const registerData: typeof RegisterDTO = req.body;
            const { error } = RegisterDTO.validate(registerData, { abortEarly: false });
            if (error) {
                const errorMessages: string[] = error.details.map((err: any) => err.message)
                throw new CustomError(StatusCodes.BAD_REQUEST, errorMessages.join(', '))
            }
            next()
        }
        catch (err: any) {
            next(err)
        }
    }
}

export default new authMiddleware()