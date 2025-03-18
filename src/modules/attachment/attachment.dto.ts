import { CardDTOForList } from "../card/card.dto"
import { UserDTOForWorkspace } from "../user/user.dto"
import { Attachment } from "./Attachment.entity"

export class AttachmentDTOForCard{
    id: number
    url: string
    constructor(attachment: Attachment){
        this.id = attachment.id
        this.url = attachment.url
    }
}

export class AttachmentDTO{
    id: number
    url: string
    card: CardDTOForList
    user: UserDTOForWorkspace
    constructor(attachment: Attachment) {
        this.id = attachment.id
        this.url = attachment.url
        this.card = new CardDTOForList(attachment.card)
        this.user = new UserDTOForWorkspace(attachment.user)
    }
}