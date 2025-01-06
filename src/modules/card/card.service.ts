import cardRepository from "./card.repository"
import { Card } from "./Card.entity"
import activityLogController from "../activityLog/activityLog.controller"
import { Board } from "../board/Board.entity"
import boardRepository from "../board/board.repository"
import { User } from "../user/User.entity"
import { Actions } from "../../common/enums/actitvitiesLog.enum"
import { List } from "../list/List.entity"
import listRepository from "../list/list.repository"
class cardService {
    private CardRepository = cardRepository
    public async addCard(user: User, cardBody: any): Promise<Card> {
        const card: Card = new Card()
        const list: List = await listRepository.findById(cardBody.listId)
        
        card.title = cardBody.title
        card.description = cardBody.description
        card.order = cardBody.order
        card.list = list
        const newCard: Card = await this.CardRepository.create(card)
        activityLogController.CardActivity(user, list.board.id, Actions.CREATE_CARD, newCard.id)
        return newCard
    }
    public async getCardById(cardId: number): Promise<Card> {
        return await this.CardRepository.findById(cardId)
    }
    public async updateCard(user: User, cardId: number, card: Card): Promise<Card> {
        const updateCard: Card = await this.CardRepository.update(cardId, card)
        const board: Board = await boardRepository.findByListId(updateCard.list.id)

        activityLogController.CardActivity(user, board.id, Actions.UPDATE_CARD, updateCard.id)
        return updateCard
    }
    public async deleteCard(cardId: number): Promise<void> {
        await this.CardRepository.delete(cardId)
    }
}
export default new cardService()