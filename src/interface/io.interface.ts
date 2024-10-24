import { StatusCodes } from "http-status-codes";
class CustomeSuccessfulResponse{
    status: number;
    message: string;
    data?: any;
    constructor(status: number = StatusCodes.OK, message: string = StatusCodes[status], data?: any){
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
export { CustomeSuccessfulResponse }