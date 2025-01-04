import { baseRepository } from "../../common/base.repository";
import { Attachment } from "./Attachment.entity";
import { NotFound } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/message.constants";

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
            throw new NotFound(MessageConstant.Attachment.NOT_FOUND);
        return attachment;
    }
    public async findByCardId(cardId: number): Promise<Attachment[]> {
        const attachments = await this.repository.find({
            where: { card: { id: cardId } },
            select: ['id', 'url', 'user.id', 'user.name']
        })
        if (!attachments)
            throw new NotFound(MessageConstant.Attachment.NOT_FOUND);
        return attachments;
    }
    public override async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new attachmentReposiotry(Attachment);