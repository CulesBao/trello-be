import { List } from "./List.entity";

export class ListDTOForBoard {
    id: number
    name: string
    constructor(list: List) {
        this.id = list.id
        this.name = list.name
    }
}