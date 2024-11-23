import { StatusCodes } from "http-status-codes";
import { baseRepository } from "../../common/base.repository";
import CustomError from "../../middleware/CustomError";
import { Comment } from "./Comment.entity";

class commentRepository extends baseRepository<Comment> {
    public override async create(comment: Comment): Promise<Comment> {
        const newComment : Comment = await this.repository.save(comment)
        return newComment
    }

    public override async findById(id: number): Promise<Comment> {
        const comment : Comment | null = await this.repository.findOne({
            where: {
                id
            },
            relations: ['user']
        })
        if (!comment)
            throw new CustomError(StatusCodes.NOT_FOUND, `Comment with id ${id} not found`)
        return comment
    }
    public async findByListId(cardId: number): Promise<Comment[]> {
        const comments : Comment[] = await this.repository.find({
            where: {
                cardId: cardId
            }
        })

        return comments
    }
    public override async update(id: number, comment: Comment): Promise<Comment> {
        await this.repository.update(id, comment)
        const updatedComment : Comment = await this.findById(id)
        return updatedComment
    }
    public override async delete(id: number): Promise<void> {
        await this.repository.delete(id)
    }
}
export default new commentRepository(Comment)