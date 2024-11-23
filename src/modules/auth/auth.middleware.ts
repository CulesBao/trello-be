import { Request, Response, NextFunction } from "express";
import { LoginDTO, RegisterDTO } from "./auth.schema";
import { baseMiddleware } from "../../middleware/base.middleware";

class authMiddleware extends baseMiddleware {
    public loginValidation(req: Request, _: Response, next: NextFunction) {
        next()
    }
    public registerValidation = this.validateSchema(RegisterDTO)
}

export default new authMiddleware()