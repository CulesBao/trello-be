import { BoardDTOForWorkSpace } from "../board/board.dto";
import { Board } from "../board/Board.entity";
import { UserDTOForWorkspace } from "../user/user.dto";
import { User } from "../user/User.entity";
import { Workspace } from "./Workspace.entity";

export interface WorkSpaceRequest {
    name: string,
    description: string | undefined
}
export class WorkSpaceDTOForBoard {
    id: number;
    name: string;
    constructor(workSpace: Workspace) {
        this.id = workSpace.id;
        this.name = workSpace.name;
    }
}
export class WorkSpaceDTO {
    id: number;
    name: string;
    description: string | undefined;
    boards: BoardDTOForWorkSpace[];
    admins: UserDTOForWorkspace[];
    users: UserDTOForWorkspace[];
    createAt: Date;
    updateAt: Date;
    constructor(workSpace: Workspace) {
        this.id = workSpace.id;
        this.name = workSpace.name;
        this.description = workSpace.description;
        this.boards = workSpace.boards.map((board: Board) => new BoardDTOForWorkSpace(board));
        this.admins = workSpace.admin.map((admin: User) => new UserDTOForWorkspace(admin));
        this.users = workSpace.users.map((user: User) => new UserDTOForWorkspace(user));
        this.createAt = workSpace.createAt;
        this.updateAt = workSpace.updateAt;
    }
}
