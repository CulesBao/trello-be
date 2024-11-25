import { StatusCodes } from "http-status-codes";
import { baseRepository } from "../../common/base.repository";
import CustomError from "../../middleware/CustomError";
import { Card } from "./Card.entity";
import cacheService from "../../service/cache.service";
import { TrelloEnum } from "../../common/enums/trello.enum";

class cardRepositoy extends baseRepository<Card> {
    public override async create(card: Card): Promise<Card> {
        cacheService.set(`${TrelloEnum.Card} + ${card.id}`, card)
        return await this.repository.save(card)
    }
    public override async findById(id: number): Promise<Card> {
        const cardCache = await cacheService.get(`${TrelloEnum.Card} + ${id}`)

        if (cardCache)
            return cardCache as Card

        const card: Card | null = await this.repository.findOne({
            where: { id: id },
            relations: ["list.board.users", "comments"]
        })
        await cacheService.set(`${TrelloEnum.Card} + ${id}`, card)
        if (!card)
            throw new CustomError(StatusCodes.NOT_FOUND, 'Card not found')

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
        const cards: Card[] = await this.repository.find({
        })
        if (!cards)
            throw new CustomError(StatusCodes.NOT_FOUND, 'Cards not found')
        return cards
    }
    public override async update(id: number, card: Card): Promise<Card> {
        await this.repository.update(id, card)
        const updatedCard = await this.findById(id)
        cacheService.del(`${TrelloEnum.Card} + ${id}`)
        cacheService.set(`${TrelloEnum.Card} + ${id}`, updatedCard)
        return updatedCard
    }
    public override async delete(id: number): Promise<void> {
        await this.findById(id)
        await super.delete(id)
        cacheService.del(`${TrelloEnum.Card} + ${id}`)
    }
}

export default new cardRepositoy(Card)