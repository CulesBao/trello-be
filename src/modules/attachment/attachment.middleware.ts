import { CloudinaryStorage, } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary.config";
import multer from 'multer'
import CustomError from "../../middleware/CustomError";
import { StatusCodes } from "http-status-codes";
import { baseMiddleware } from "../../middleware/base.middleware";
import { AddAttachment } from "./attachment.schema";
import { Request, Response, NextFunction } from "express";
import { Card } from "../card/Card.entity";
import cardRepository from "../card/card.repository";

class attachmentMiddleware extends baseMiddleware {
    static storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req: Request, file: any) => {
            if (!file)
                throw new CustomError(StatusCodes.BAD_REQUEST, 'File not found');
            req.file = file
            const allowedFormats = ['jpg', 'png', 'jpeg', 'gif', 'svg', 'pdf', 'doc', 'docx'];
            const fileFormat = file.originalname.split('.')[1];
            if (!allowedFormats.includes(fileFormat)) {
                throw new CustomError(StatusCodes.BAD_REQUEST, 'File format is not supported');
            }
            return {
                folder: 'attachments',
                format: fileFormat,
            };
        }
    })
    static upload = multer({ storage: this.storage }).single('file')

    public addAttachment = this.validateSchema(AddAttachment)

    static isUserInBoard() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const cardId = req.body.cardId || Number(req.params.id)
                if (isNaN(cardId))
                    throw new CustomError(StatusCodes.BAD_REQUEST, 'Card id must be a number')
                const userId = req.id

                const card: Card | null = await cardRepository.findForFile(cardId)
                if (card == null || card.list.board.users.find(user => user.id === userId) === undefined) { 
                    req.userNotInBoard = true
                }
                req.card = card
                next()
            }
            catch (error: unknown) {
                next(error)
            }
        }
    }
}
export default attachmentMiddleware;