import { NextFunction, Request, Response } from "express";
import { UpdateDTO } from "./dto/user.dto";
import CustomError from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";
export class userMiddleware {
    public async updateUser(req: Request, _: Response, next: NextFunction) {
        try {
            const updateData: typeof UpdateDTO = req.body
            const { error } = UpdateDTO.validate(updateData, {abortEarly: false})
            if (error){
                const messages: string[] = error.details.map((err) => err.message)
                throw new CustomError(StatusCodes.BAD_REQUEST, messages.join(', '))
            }
            next()
        }
        catch (error) {
            next(error);
        }
    }
}