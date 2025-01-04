import { CloudinaryStorage, } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary.config";
import multer from 'multer'
import { baseMiddleware } from "../../middleware/base.middleware";
import { AddAttachment } from "./attachment.schema";
import { Request } from "express";
import { BadRequest, NotFound } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/message.constants";

class attachmentMiddleware extends baseMiddleware {
    static storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req: Request, file: any) => {
            if (!file)
                throw new NotFound(MessageConstant.Attachment.NOT_FOUND)
            req.file = file
            const allowedFormats = ['jpg', 'png', 'jpeg', 'gif', 'svg', 'pdf', 'doc', 'docx'];
            const fileFormat = file.originalname.split('.')[1];
            if (!allowedFormats.includes(fileFormat)) {
                throw new BadRequest(MessageConstant.Attachment.INVALID_FORMAT)
            }
            return {
                folder: 'attachments',
                format: fileFormat,
            };
        }
    })
    static upload = multer({ storage: this.storage }).single('file')

    public addAttachment = this.validateSchema(AddAttachment)
}
export default attachmentMiddleware;