import attachmentRepository from "./attachment.repository";
import { Attachment } from "./Attachment.entity";
import { User } from "../user/User.entity";
import { v2 as cloudinary } from 'cloudinary'
import { Forbidden, NotFound } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/message.constants";

class attachmentService {
    public async upload(attachment: Attachment): Promise<Attachment> {
        await attachmentRepository.create(attachment)
        const publicId = attachment.url
            .split('/').slice(-2).join('/').split('.')[0];
        cloudinary.uploader.destroy(publicId)
        await attachmentRepository.delete(attachment.id)
        return attachment
    }
    public async findByCardId(cardId: number): Promise<Attachment[]> {
        const attachments = await attachmentRepository.findByCardId(cardId)
        return attachments
    }
    public async findById(id: number): Promise<Attachment> {
        const attachment = await attachmentRepository.findById(id)
        return attachment
    }
    public async delete(id: number, user: User): Promise<void> {
        const attachment = await attachmentRepository.findById(id)
        if (!attachment)
            throw new NotFound(MessageConstant.Attachment.NOT_FOUND)
        if (attachment.user.id !== user.id)
            throw new Forbidden(MessageConstant.Attachment.FORBIDDEN)
        const publicId = attachment.url
            .split('/')
            .slice(-2)
            .join('/')
            .split('.')[0];
        cloudinary.uploader.destroy(publicId)
        await attachmentRepository.delete(id)
    }
}
export default new attachmentService();