import { CardDTOForList } from "../card/card.dto";
import { List } from "./List.entity";

export class ListDTOForBoard {
    id: number
    name: string
    constructor(list: List) {
        this.id = list.id
        this.name = list.name
    }
}
export interface ListDTORequest{
    name: string
    order: number
    boardId: number
}
export class ListDTO{
    id: number
    name: string
    order: number
    cards: CardDTOForList[]
    constructor(list: List) {
        this.id = list.id
        this.name = list.name
        this.order = list.order
        this.cards = list.cards.map(card => new CardDTOForList(card))
    }
}