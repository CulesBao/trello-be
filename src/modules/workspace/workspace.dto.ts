import { BoardConstructor, BoardDTOForWorkspace } from "../board/board.dto";
import { Board } from "../board/Board.entity";
import { UserConstructor, UserDTO } from "../user/user.dto";
import { User } from "../user/User.entity";
import { Workspace } from "./Workspace.entity";

export interface WorkSpaceDTO {
    id: number,
    name: string,
    description: string | undefined,
    boards: BoardDTOForWorkspace[],
    admins: UserDTO[],
    users: UserDTO[],
    createAt: Date,
    updateAt: Date
}
export interface WorkSpaceRequest{
    name: string,
    description: string | undefined
}
export function WorkSpaceConstructor(workSpace: Workspace): WorkSpaceDTO {
    return {
        id: workSpace.id,
        name: workSpace.name,
        description: workSpace.description,
        boards: workSpace.boards.map((board: Board) => BoardConstructor(board)),
        admins: workSpace.admin.map((admin: User) => UserConstructor(admin)),
        users: workSpace.users.map((user: User) => UserConstructor(user)),
        createAt: workSpace.createAt,
        updateAt: workSpace.updateAt
    }
}