import { StatusCodes } from "http-status-codes"

class CustomError extends Error {
  public statusCode: number;

  constructor(
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR]
  ) {
    super(message);
    this.name = 'Expected Error';
    this.statusCode = statusCode;
  }
}

export default CustomError;