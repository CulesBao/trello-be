import { User } from "../user/User.entity"
import { Workspace } from "../workspace/Workspace.entity"
import { BoardRepository } from "./board.repository"
import { Board } from "./Board.entity"
import userRepository from "../user/user.repository"
import activityLogController from "../activityLog/activityLog.controller"
import { Actions } from "../../common/enums/actitvitiesLog.enum"
import { BoardDTO } from "./board.dto"
import { BadRequest, Forbidden, NotFound } from "../../handler/failed.handler"
import { MessageConstant } from "../../common/message.constants"
import assignRoleService from "../assignRole/assignRole.service"
import { Roles } from "../../common/enums/roles.enum"
import workspaceRepository from "../workspace/workspace.repository"

class boardService {
    private boardReposiory = new BoardRepository(Board)
    public async addNewBoard(board: Board, user: User): Promise<BoardDTO> {
        const newBoard: Board = await this.boardReposiory.createBoard(board)

        await activityLogController.BoardActivity(user, newBoard, `${Actions.CREATE_BOARD}`)
        await assignRoleService.assignRoleBoard(user.id, Roles.ADMIN_BOARD, newBoard)

        return new BoardDTO(newBoard)
    }
    public async getBoard(boardId: number): Promise<BoardDTO> {
        const board: Board = await this.boardReposiory.findById(boardId)
        return new BoardDTO(board)
    }
    public async deleteBoard(boardId: number): Promise<void> {
        const board: Board = await this.boardReposiory.findById(boardId)
        await assignRoleService.deleteRoleBoard(board.admin.id, Roles.ADMIN_BOARD, board)
        await this.boardReposiory.delete(boardId)
    }
    public async updateBoard(boardToUpdate: Board, boardId: number, user: User): Promise<BoardDTO> {
        const updatedBoard: Board = await this.boardReposiory.update(boardId, boardToUpdate)
        const board: Board = await this.boardReposiory.findById(boardId)
        await activityLogController.BoardActivity(user, updatedBoard, `${Actions.UPDATE_BOARD}`)
        return new BoardDTO(board)
    }

    public async addMemberToBoard(user: User, boardId: number, email: string): Promise<BoardDTO> {
        const affectedUser: User = await userRepository.findByEmail(email)
        const board: Board = await this.boardReposiory.findById(boardId)
        const workspace: Workspace = await workspaceRepository.findById(board.workspace.id)
        if (workspace.users.find((value: User) => value.id == affectedUser.id) == undefined)
            throw new NotFound(MessageConstant.Role.NOT_FOUND_MEMBER)
        if (board.users.find((value: User) => value.id == affectedUser.id) != undefined)
            throw new BadRequest(MessageConstant.Role.EXISTED_MEMBER)
        board.users.push(affectedUser)

        const updatedBoard: Board = await this.boardReposiory.update(board.id, board)
        await activityLogController.BoardActivity(user, board, `${Actions.ADD_MEMBER}`, affectedUser)
        await assignRoleService.assignRoleBoard(affectedUser.id, Roles.MEMBER_BOARD, board)
        return new BoardDTO(updatedBoard)
    }
    public async removeMemberFromBoard(boardId: number, userId: number): Promise<BoardDTO> {
        const board: Board = await this.boardReposiory.findById(boardId)
        const user: User = await userRepository.findById(userId)
        if (board.users.find((value: User) => value.id == userId) == undefined)
            throw new NotFound(MessageConstant.Role.NOT_FOUND_MEMBER)
        console.log(board.admin.id, userId)
        if (board.admin.id == userId)
            throw new Forbidden(MessageConstant.Role.REQUIRED_ADMIN)
        board.users = board.users.filter((value: User) => value.id != userId)

        const updatedBoard: Board = await this.boardReposiory.update(board.id, board);
        await activityLogController.BoardActivity(board.admin, board, `${Actions.REMOVE_MEMBER}`, user)
        await assignRoleService.deleteRoleBoard(userId, Roles.MEMBER_BOARD, board)
        return new BoardDTO(updatedBoard)
    }
}
export default new boardService()