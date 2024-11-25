import { NextFunction } from "express";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomSuccessfulResponse } from "../../middleware/successResponse.middleware";
import { User } from "../user/User.entity";
import { Card } from "../card/Card.entity";
import { Attachment } from "./Attachment.entity";
import CustomError from "../../middleware/CustomError";
import attachmentService from "./attachment.service";

class attachmentController {
    static async upload(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file)
                throw new CustomError(StatusCodes.BAD_REQUEST, 'File not found');
            const attachment = new Attachment()
            const user: User = req.user
            const card: Card = req.card

            attachment.user = user
            attachment.card = card
            attachment.url = req.file.path

            const response: CustomSuccessfulResponse = await attachmentService.upload(attachment, req.userNotInBoard)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        } catch (error) {
            next(error);
        }
    }
    static async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id)
            const response: CustomSuccessfulResponse = await attachmentService.findById(id)
            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        } catch (error) {
            next(error)
        }
    }
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id)
            const user: User = req.user
            const response: CustomSuccessfulResponse = await attachmentService.delete(id, user)
            res.status(response.status).json({
                message: response.message
            })
        } catch (error) {
            next(error)
        }
    }
}
export default attachmentController;