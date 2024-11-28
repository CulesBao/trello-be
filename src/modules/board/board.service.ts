import { CustomSuccessfulResponse } from "../../middleware/successResponse.middleware"
import CustomError from "../../middleware/CustomError"
import { User } from "../user/User.entity"
import { Workspace } from "../workspace/Workspace.entity"
import { BoardRepository } from "./board.repository"
import { Board } from "./Board.entity"
import { StatusCodes } from "http-status-codes"
import userRepository from "../user/user.repository"
import activityLogController from "../activityLog/activityLog.controller"
import { Actions } from "../../common/enums/actitvitiesLog.enum"
import { BoardDTO } from "./board.dto"
import { BadRequest, NotFound } from "../../handler/failed.handler"
import { MessageConstant } from "../../common/constants/message.constants"
class boardService {
    private boardReposiory = new BoardRepository(Board)
    public async addNewBoard(board: Board, user: User): Promise<BoardDTO> {
        const newBoard: Board = await this.boardReposiory.createBoard(board)

        await activityLogController.BoardActivity(user, newBoard, `${Actions.CREATE_BOARD}`)
        return new BoardDTO(newBoard)
    }
    public async getBoard(board: Board): Promise<CustomSuccessfulResponse> {
        return new CustomSuccessfulResponse(StatusCodes.OK, `Board with ID ${board.id} had been found`, board)
    }
    public async deleteBoard(board: Board): Promise<void> {
        await this.boardReposiory.delete(board.id)
        await activityLogController.BoardActivity(board.admin, board, `${Actions.DELETE_BOARD}`)
    }
    public async getAllBoard(workSpace: Workspace): Promise<BoardDTO[]> {
        const boards: Board[] = workSpace.boards
        return boards.map((value: Board) => new BoardDTO(value))
    }
    public async updateBoard(board: Board, boardId: number, user: User): Promise<BoardDTO> {
        const updatedBoard: Board = await this.boardReposiory.update(boardId, board)
        await activityLogController.BoardActivity(user, updatedBoard, `${Actions.UPDATE_BOARD}`)

        return new BoardDTO(updatedBoard)
    }
    public isBoardInWorkSpace(workSpace: Workspace, boardId: number): Board {
        const board: Board | undefined = workSpace.boards.find((value: Board) => value.id == boardId)
        if (board == undefined)
            throw new NotFound(MessageConstant.Board.NOT_FOUND)
        return board
    }

    public async addMemberToBoard(user: User, board: Board, email: string): Promise<BoardDTO> {
        const affectedUser: User = await userRepository.findByEmail(email)
        if (board.users.find((value: User) => value.id == affectedUser.id) != undefined)
            throw new BadRequest(MessageConstant.Role.EXISTED_MEMBER)
        board.users.push(affectedUser)

        const updatedBoard: Board = await this.boardReposiory.update(board.id, board)
        await activityLogController.BoardActivity(user, board, `${Actions.ADD_MEMBER}`, affectedUser)
        return new BoardDTO(updatedBoard)
    }
    public async removeMemberFromBoard(board: Board, userId: number): Promise<CustomSuccessfulResponse> {
        const user: User | undefined = board.users.find((value: User) => value.id == userId)
        if (user == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `User with ID ${userId} cannot found in this board`)
        if (board.admin.id == userId)
            throw new CustomError(StatusCodes.FORBIDDEN, `User with ID ${userId} cannot remove himself from board ${board.name}`)
        board.users = board.users.filter((value: User) => value.id != userId)
        const updatedBoard = { ...board, users: board.users };

        await activityLogController.BoardActivity(board.admin, board, `${Actions.REMOVE_MEMBER}`, user)

        await this.boardReposiory.update(board.id, updatedBoard);
        return new CustomSuccessfulResponse(StatusCodes.OK, `User with ID ${userId} had been remove from board ${board.name}`, board)
    }
}
export default new boardService()