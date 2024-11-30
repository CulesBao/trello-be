import { Card } from "./Card.entity"

export class CardDTOForList{
    id: number
    title: string
    description: string | undefined
    order: number
    constructor(card: Card){
        this.id = card.id
        this.title = card.title
        this.description = card.description
        this.order = card.order
    }
}