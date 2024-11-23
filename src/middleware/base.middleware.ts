import { Request, Response, NextFunction } from "express"
import Joi from "joi";
import CustomError from "./CustomError";
import { StatusCodes } from "http-status-codes";
export class baseMiddleware {
    public validateSchema(schema: Joi.ObjectSchema) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const data: typeof schema = req.body
                const { error } = schema.validate(data, { abortEarly: false })

                if (error) {
                    const errArr: string[] = error.details.map((err) => err.message)
                    throw new CustomError(StatusCodes.BAD_REQUEST, errArr.join(', '))
                }
                next()
            }
            catch (err) {
                next(err)
            }
        }
    }
}