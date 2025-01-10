import { CardDTOForList } from "../card/card.dto"
import { UserDTOForAll } from "../user/user.dto"
import { Comment } from "./Comment.entity"

export class CommentDTOForCard {
    id: number
    content: string
    user: UserDTOForAll
    createdAt: Date
    updateAt: Date
    constructor(comment: Comment) {
        this.user = comment.user
        this.id = comment.id
        this.content = comment.content
        this.createdAt = comment.createAt
        this.updateAt = comment.updateAt
    }
}
export class CommentDTO{
    id: number
    content: string
    user: UserDTOForAll
    card: CardDTOForList
    createAt: Date
    updateAt: Date
    constructor(comment: Comment) {
        this.id = comment.id
        this.user = new UserDTOForAll(comment.user)
        this.card = new CardDTOForList(comment.card)
        this.content = comment.content
        this.createAt = comment.createAt
        this.updateAt = comment.updateAt
    }
}