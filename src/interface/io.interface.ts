import { StatusCodes } from "http-status-codes";
class responseOK{
    status: number;
    message: string;
    data?: any;
    constructor(status: number = StatusCodes.OK, message: string = StatusCodes[status], data?: any){
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
class error{
    status: number
    message: string
    constructor(status:number = StatusCodes.INTERNAL_SERVER_ERROR, message: string = StatusCodes[status]){
        this.status = status
        this.message = message
    }
}
export { responseOK, error }