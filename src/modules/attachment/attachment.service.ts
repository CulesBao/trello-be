import { CustomSuccessfulResponse } from "../../middleware/successResponse.middleware";
import attachmentRepository from "./attachment.repository";
import { StatusCodes } from "http-status-codes";
import { Attachment } from "./Attachment.entity";
import { User } from "../user/User.entity";
import {v2 as cloudinary} from 'cloudinary'
import CustomError from "../../middleware/CustomError";

class attachmentService {
    public async upload(attachment: Attachment, userNotInBoard: boolean): Promise<CustomSuccessfulResponse> {
        await attachmentRepository.create(attachment)
        if (userNotInBoard){
            const publicId = attachment.url
                        .split('/').slice(-2).join('/').split('.')[0];
            cloudinary.uploader.destroy(publicId)
            await attachmentRepository.delete(attachment.id)
            throw new CustomError(StatusCodes.FORBIDDEN, 'You are not allowed to upload attachment to this card')
        }
        return new CustomSuccessfulResponse(StatusCodes.CREATED, 'Attachment uploaded successfully', attachment)
    }
    public async findByCardId(cardId: number): Promise<CustomSuccessfulResponse> {
        const attachments = await attachmentRepository.findByCardId(cardId)
        return new CustomSuccessfulResponse(StatusCodes.OK, 'Attachments found', attachments)
    }
    public async findById(id: number): Promise<CustomSuccessfulResponse> {
        const attachment = await attachmentRepository.findById(id)
        return new CustomSuccessfulResponse(StatusCodes.OK, 'Attachment found', attachment)
    }
    public async delete(id: number, user: User): Promise<CustomSuccessfulResponse> {
        const attachment = await attachmentRepository.findById(id)
        if (!attachment)
            return new CustomSuccessfulResponse(StatusCodes.NOT_FOUND, 'Attachment not found')
        if (attachment.user.id !== user.id)
            return new CustomSuccessfulResponse(StatusCodes.FORBIDDEN, 'You are not allowed to delete this attachment')
        const publicId = attachment.url
                        .split('/')
                        .slice(-2)
                        .join('/')
                        .split('.')[0]; 
        cloudinary.uploader.destroy(publicId)
        await attachmentRepository.delete(id)
        return new CustomSuccessfulResponse(StatusCodes.OK, 'Attachment deleted successfully')
    }
}
export default new attachmentService();