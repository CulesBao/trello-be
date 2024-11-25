import { StatusCodes } from "http-status-codes";
import { baseRepository } from "../../common/base.repository";
import CustomError from "../../middleware/CustomError";
import { Attachment } from "./Attachment.entity";

class attachmentReposiotry extends baseRepository<Attachment>{
    public override async create(entity: Attachment): Promise<Attachment> {
        return await this.repository.save(entity);
    }
    public override async findById(id: number): Promise<Attachment> {
        const attachment = await this.repository.findOne({
            where: { id },
            relations: ['user', 'card']
        })
        if (!attachment)
            throw new CustomError(StatusCodes.NOT_FOUND, 'Attachment not found');
        return attachment;
    }
    public async findByCardId(cardId: number): Promise<Attachment[]> {
        const attachments = await this.repository.find({
            where: { card: { id: cardId } },
            select: ['id', 'url', 'user.id', 'user.name']
        })
        if (!attachments)
            throw new CustomError(StatusCodes.NOT_FOUND, 'Attachments not found');
        return attachments;
    }
    public override async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new attachmentReposiotry(Attachment);