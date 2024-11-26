import { Request, Response, NextFunction } from 'express';
import { CustomError, CustomError as CustomErrorType } from '../handler/failed.handler'
import { StatusCodes } from 'http-status-codes';
export const errorMiddleware = (err: CustomErrorType | Error, _: Request, res: Response, __: NextFunction): void => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            type: err.type,
            details: {
                code: err.error.errorCode,
                message: err.error.message
            }
        });
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            name: 'Unexpected Error',
            message: err.message
        });
    }
}