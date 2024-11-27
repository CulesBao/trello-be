import { ListDTOForBoard } from "../list/list.dto"
import { List } from "../list/List.entity"
import {UserDTOForWorkspace } from "../user/user.dto"
import { User } from "../user/User.entity"
import { WorkSpaceDTOForBoard } from "../workspace/workspace.dto"
import { Board } from "./Board.entity"

export class BoardDTOForWorkSpace{
    id: number
    name: string
    constructor(board: Board){
        this.id = board.id
        this.name = board.name
    }
}
export interface AddBoardRequest{
    name: string
    description: string
    workSpaceId: number
}
export class BoardDTO {
    id: number
    name: string
    description: string | undefined
    lists: ListDTOForBoard[]
    workspace: WorkSpaceDTOForBoard
    admin: UserDTOForWorkspace
    users: UserDTOForWorkspace[]
    createAt: Date
    updateAt: Date
    constructor(board: Board) {
        this.id = board.id
        this.name = board.name
        this.description = board.description
        this.lists = board.lists.map((list: List) => new ListDTOForBoard(list))
        this.workspace = new WorkSpaceDTOForBoard(board.workspace)
        this.admin = new UserDTOForWorkspace(board.admin)
        this.users = board.users.map((user: User) => new UserDTOForWorkspace(user))
        this.createAt = board.createAt
        this.updateAt = board.updateAt
    }
}