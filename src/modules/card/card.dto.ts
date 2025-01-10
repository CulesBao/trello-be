import { AttachmentDTOForCard } from "../attachment/attachment.dto"
import { CheckListDTOForCard } from "../checkList/checkList.dto"
import { CommentDTOForCard } from "../comment/comment.dto"
import { ListDTOForBoard } from "../list/list.dto"
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
    list: ListDTOForBoard
    comments: CommentDTOForCard[]
    checkLists: CheckListDTOForCard[]
    attachments: AttachmentDTOForCard[] 
    createAt: Date
    updateAt: Date
    constructor(card: Card){
        this.id = card.id
        this.title = card.title
        this.description = card.description
        this.order = card.order
        this.list = new ListDTOForBoard(card.list)
        this.comments = card.comments?.map(comment => new CommentDTOForCard(comment))
        this.checkLists = card.checkLists?.map(checkList => new CheckListDTOForCard(checkList))
        this.attachments = card.attachments?.map(attachment => new AttachmentDTOForCard(attachment))
        this.createAt = card.createAt
        this.updateAt = card.updateAt
    }
}