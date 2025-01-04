import { CheckListDTOForCard } from "../checkList/checkList.dto"
import { CommentDTOForCard } from "../comment/comment.dto"
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

export class CardDTO{
    id: number
    title: string
    description: string | undefined
    order: number
    listId: number
    comments: CommentDTOForCard[]
    checkLists: CheckListDTOForCard[]
    constructor(card: Card){
        this.id = card.id
        this.title = card.title
        this.description = card.description
        this.order = card.order
        this.listId = card.list.id
        this.comments = card.comments.map(comment => new CommentDTOForCard(comment))
        this.checkLists = card.checkLists.map(checkList => new CheckListDTOForCard(checkList))
    }
}