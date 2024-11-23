import { Request, Response, NextFunction } from 'express';
import CustomError from './CustomError'
import { StatusCodes } from 'http-status-codes';
export const errorMiddleware = (err: CustomError | Error, _: Request, res: Response, __: NextFunction): void => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            name: err.name,
            message: err.message
        });
    }
    else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            name: "Unexpected Error",
            message: err.message
        });
    }
}