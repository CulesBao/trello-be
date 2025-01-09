import { NextFunction } from "express";
import { Request, Response } from "express";
import { User } from "../user/User.entity";
import { Card } from "../card/Card.entity";
import { Attachment } from "./Attachment.entity";
import attachmentService from "./attachment.service";
import { NotFound } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/message.constants";
import { Created, NoContent, OK } from "../../handler/success.handler";

class attachmentController {
    static async upload(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file)
                throw new NotFound(MessageConstant.Attachment.NOT_FOUND)
            const attachment: Attachment = new Attachment()
            const user: User = req.user as User
            const card: Card = req.card

            attachment.user = user
            attachment.card = card
            attachment.url = req.file.path

            const uploadAttachment: Attachment = await attachmentService.upload(attachment)
            new Created(res, "Attachment uploaded successfully", uploadAttachment)
        } catch (error) {
            next(error);
        }
    }
    static async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id)
            const attachment: Attachment = await attachmentService.findById(id)
            new OK(res, "Attachment found", attachment)
        } catch (error) {
            next(error)
        }
    }
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id)
            const user: User = req.user as User
            await attachmentService.delete(id, user)
            new NoContent(res)
        } catch (error) {
            next(error)
        }
    }
}
export default attachmentController;