import { NextFunction, Request, Response } from "express";
import { Card } from "./Card.entity";
import cardService from "./card.service";
import { Created, NoContent, OK } from "../../handler/success.handler";
import { CardDTO } from "./card.dto";
import { User } from "../user/User.entity";

class cardController {
    public async createCard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user: User = req.user as User

            const newCard: Card = await cardService.addCard(user, req.body)
            new Created(res, 'Card created successfully', new CardDTO(newCard))
        } catch (error: unknown) {
            next(error)
        }
    }
    public async getCardById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const cardId: number = Number(req.params.id)
            const card: Card = await cardService.getCardById(cardId)

            new OK(res, 'Card found', new CardDTO(card))
        } catch (error: unknown) {
            next(error)
        }
    }
    public async updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const card = new Card()
            const user: User = req.user as User
            const cardId: number = Number(req.params.id)
            const cardRequest = req.body

            card.title = cardRequest.title
            card.description = cardRequest.description
            card.order = cardRequest.order

            const updateCard: Card = await cardService.updateCard(user, cardId, card)
            new OK(res, 'Card updated successfully', new CardDTO(updateCard))
        } catch (error: unknown) {
            next(error)
        }
    }
    public async deleteCardById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const cardId: number = Number(req.params.id)

            await cardService.deleteCard(cardId)
            new NoContent(res)
        } catch (error: unknown) {
            next(error)
        }
    }
}
export default new cardController()