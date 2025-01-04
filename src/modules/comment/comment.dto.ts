
import { UserDTOForAll } from "../user/user.dto"
import { Comment } from "./Comment.entity"

export class CommentDTOForCard {
    id: number
    content: string
    user: UserDTOForAll
    createdAt: Date
    constructor(comment: Comment) {
        this.user = comment.user
        this.id = comment.id
        this.content = comment.content
        this.createdAt = comment.createAt
    }
}
export class CommentDTO{
    id: number
    content: string
    user: UserDTOForAll
    createAt: Date
    updateAt: Date
    constructor(comment: Comment) {
        this.user = comment.user
        this.id = comment.id
        this.content = comment.content
        this.createAt = comment.createAt
        this.updateAt = comment.updateAt
    }
}