import { Response } from "express";
import { StatusCodes } from "http-status-codes";

class SuccessfulResponse {
    protected status: number;
    protected message: string;
    protected data?: any;

    constructor(
        private res: Response,
        status: number = StatusCodes.OK,
        message: string = StatusCodes[status],
        data?: any
    ) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.sendResponse();
    }

    private sendResponse() {
        this.res.status(this.status).json({
            message: this.message,
            data: this.data,
        });
    }
}

export class OK extends SuccessfulResponse {
    constructor(res: Response, message: string = StatusCodes[StatusCodes.OK], data?: any) {
        super(res, StatusCodes.OK, message, data);
    }
}

export class Created extends SuccessfulResponse {
    constructor(res: Response, message: string = StatusCodes[StatusCodes.CREATED]) {
        super(res, StatusCodes.CREATED, message);
    }
}