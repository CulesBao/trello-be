import { Request, Response, NextFunction } from "express"
import Joi from "joi";
import { BadRequest } from "../handler/failed.handler";
export class baseMiddleware {
    public validateSchema(schema: Joi.ObjectSchema) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const data: typeof schema = req.body
                const { error } = schema.validate(data, { abortEarly: false })

                if (error) {
                    const errArr: string[] = error.details.map((err) => err.message)
                    throw new BadRequest({
                        errorCode: "VAL_001",
                        message: errArr.join(", ")
                    })
                }
                next()
            }
            catch (err) {
                next(err)
            }
        }
    }
}