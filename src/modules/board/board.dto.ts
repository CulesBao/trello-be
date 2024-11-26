import { Board } from "./Board.entity"

export interface BoardDTOForWorkspace {
    id: number,
    name: string
}

export function BoardConstructor(board: Board): BoardDTOForWorkspace {
    return {
        id: board.id,
        name: board.name
    }
}