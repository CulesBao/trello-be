import { StatusCodes } from "http-status-codes"
import { DetailsError } from "../common/constants/message.constants";
enum ErrorType {
    ExpectedError = "Expected Error",
    UnexpectedError = "Unexpected Error"
}

export class CustomError extends Error {
    public statusCode: number;
    public type: ErrorType
    public error: DetailsError;

    constructor(statusCode: number, error: DetailsError) {
        super(error.message);
        this.statusCode = statusCode;
        this.type = statusCode < 500 ? ErrorType.ExpectedError : ErrorType.UnexpectedError;
        this.error = error;
    }
}

export class BadRequest extends CustomError {
    constructor(error: DetailsError) {
        super(StatusCodes.BAD_REQUEST, error);
    }
}
export class Unauthorized extends CustomError {
    constructor(error: DetailsError) {
        super(StatusCodes.UNAUTHORIZED, error);
    }
}
export class Forbidden extends CustomError {
    constructor(error: DetailsError) {
        super(StatusCodes.FORBIDDEN, error);
    }
}
export class NotFound extends CustomError {
    constructor(error: DetailsError) {
        super(StatusCodes.NOT_FOUND, error);
    }
}
export class MethodNotAllowed extends CustomError {
    constructor(error: DetailsError) {
        super(StatusCodes.METHOD_NOT_ALLOWED, error);
    }
}
export class NotAcceptable extends CustomError {
    constructor(error: DetailsError) {
        super(StatusCodes.NOT_ACCEPTABLE, error);
    }
}