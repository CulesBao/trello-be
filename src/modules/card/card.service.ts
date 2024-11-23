import { StatusCodes } from "http-status-codes"
import { CustomSuccessfulResponse } from "../../middleware/successResponse.middleware"
import cardRepository from "./card.repository"
import { Card } from "./Card.entity"
class cardService {
    private CardRepository = cardRepository
    public async addCard(card: Card): Promise<CustomSuccessfulResponse> {
        await this.CardRepository.create(card)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, 'Card created successfully', card)
    }
    public async getCardById(cardId: number): Promise<Card> {
        return await this.CardRepository.findById(cardId)
    }
    public async updateCard(cardId: number, card: Card): Promise<CustomSuccessfulResponse> {
        const updateCard : Card = await this.CardRepository.update(cardId, card)
        return new CustomSuccessfulResponse(StatusCodes.OK, 'Card updated successfully', updateCard)
    }
    public async deleteCard(cardId: number): Promise<CustomSuccessfulResponse> {
        await this.CardRepository.delete(cardId)
        return new CustomSuccessfulResponse(StatusCodes.OK, 'Card deleted successfully')
    }
}
export default new cardService()