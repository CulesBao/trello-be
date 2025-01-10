import { Attachment } from "./Attachment.entity"

export class AttachmentDTOForCard{
    id: number
    url: string
    constructor(attachment: Attachment){
        this.id = attachment.id
        this.url = attachment.url
    }
}