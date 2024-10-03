import { error } from '../interface/io.interface'
import { Response } from 'express'
export const errorHandlingMiddleware = (err : any, res: Response) => {
  const responseError : error = new error(err.statusCode, err.message)
  console.error(responseError)
  res.status(responseError.status).json({message: responseError.message})
}