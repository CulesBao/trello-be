import cardRepository from "./card.repository"
import { Card } from "./Card.entity"
import activityLogController from "../activityLog/activityLog.controller"
import { Board } from "../board/Board.entity"
import boardRepository from "../board/board.repository"
import { User } from "../user/User.entity"
import { Actions } from "../../common/enums/actitvitiesLog.enum"
class cardService {
    private CardRepository = cardRepository
    public async addCard(user: User, card: Card): Promise<Card> {
        const newCard: Card = await this.CardRepository.create(card)
        const board: Board = await boardRepository.findByListId(newCard.list.id)
        activityLogController.CardActivity(user, board, Actions.CREATE_CARD, newCard)
        return newCard
    }
    public async getCardById(cardId: number): Promise<Card> {
        return await this.CardRepository.findById(cardId)
    }
    public async updateCard(user: User, cardId: number, card: Card): Promise<Card> {
        const updateCard: Card = await this.CardRepository.update(cardId, card)
        const board: Board = await boardRepository.findByListId(updateCard.list.id)

        activityLogController.CardActivity(user, board, Actions.UPDATE_CARD, updateCard)
        return updateCard
    }
    public async deleteCard(cardId: number): Promise<void> {
        await this.CardRepository.delete(cardId)
    }
}
export default new cardService()