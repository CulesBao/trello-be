import { baseRepository } from "../../common/base.repository";
import { MessageConstant } from "../../common/message.constants";
import { NotFound } from "../../handler/failed.handler";
import { Card } from "./Card.entity";

class cardRepositoy extends baseRepository<Card> {
    public override async create(card: Card): Promise<Card> {
        return await this.repository.save(card)
    }
    public override async findById(id: number): Promise<Card> {
        const card: Card | null = await this.repository.findOne({
            where: { id: id },
            relations: ["list.board.users", "comments", "list.board.id"]
        })
        if (!card)
            throw new NotFound(MessageConstant.Card.NOT_FOUND)

        return card
    }
    public async findForFile(id: number): Promise<Card | null> {
        const card: Card | null = await this.repository.findOne({
            where: { id: id },
            relations: ["list.board.users"]
        })
        return card
    }
    public override async findAll(): Promise<Card[]> {
        const cards: Card[] = await this.repository.find({})
        if (!cards)
            throw new NotFound(MessageConstant.Card.NOT_FOUND)
        return cards
    }
    public override async update(id: number, card: Card): Promise<Card> {
        await this.findById(id)
        await this.repository.update(id, card)
        const updatedCard = await this.findById(id)
        return updatedCard
    }
    public override async delete(id: number): Promise<void> {
        await this.findById(id)
        await super.delete(id)
    }
}

export default new cardRepositoy(Card)