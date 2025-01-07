import { CardDTOForList } from "../card/card.dto"
import { CheckList } from "./CheckList.entity"

export class CheckListDTOForCard{
    isDone: boolean
    content: string
    constructor(checkList: CheckList){
        this.isDone = checkList.isDone
        this.content = checkList.content
    }
}
export class CheckListDTO {
    id: number
    isDone: boolean
    content: string
    card: CardDTOForList
    createAt: Date
    updateAt: Date
    constructor(checkList: CheckList){
        this.id = checkList.id
        this.isDone = checkList.isDone
        this.content = checkList.content
        this.card = new CardDTOForList(checkList.card)
        this.createAt = checkList.createAt
        this.updateAt = checkList.update
    }
}