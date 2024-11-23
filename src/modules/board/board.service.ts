import { CustomSuccessfulResponse } from "../../template/response.dto"
import CustomError from "../../utils/CustomError"
import { User } from "../user/entity/User"
import { Workspace } from "../workspace/entity/Workspace"
import { BoardRepository } from "./board.repository"
import { Board } from "./entity/Board"
import { StatusCodes } from "http-status-codes"
import { UserService } from "../user/user.repository"
class boardService {
    private boardReposiory = new BoardRepository(Board)
    private userRepository = new UserService(User)
    public async addNewBoardToWorkSpace(workSpace: Workspace, board: Board, userId: number): Promise<CustomSuccessfulResponse> {
        const user: User | undefined = workSpace?.users?.find((value: User) => value.id == userId)
        if (user == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `User with ID ${userId} cannot found in this workspace`)
        const newBoard : Board = await this.boardReposiory.createBoard(board, workSpace, user)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, `Board had been add to workspace ${workSpace.name}`, newBoard)
    }
    public async getBoardFromWorkSpace(board: Board) : Promise <CustomSuccessfulResponse> {
        return new CustomSuccessfulResponse(StatusCodes.OK, `Board with ID ${board.id} had been found`, board)
    }
    public async deleteBoardFromWorkSpace(boardId : number): Promise<CustomSuccessfulResponse> {
        await this.boardReposiory.delete(boardId)
        return new CustomSuccessfulResponse(StatusCodes.OK, `Board with ID ${boardId} had been deleted`)
    }
    public async getAllBoard(workSpace: Workspace): Promise<CustomSuccessfulResponse> {
        const boards: Board[] = await this.boardReposiory.getAllBoardByWorkSpace(workSpace)
        return new CustomSuccessfulResponse(StatusCodes.OK, `All boards from workspace ${workSpace.name} had been found`, boards)
    }
    public async updateBoard(board: Board, boardId: number): Promise<CustomSuccessfulResponse> {
        const updatedBoard: Board = await this.boardReposiory.update(boardId, board)
        return new CustomSuccessfulResponse(StatusCodes.OK, `Board with ID ${boardId} had been updated`, updatedBoard)
    }
    public isBoardInWorkSpace(workSpace: Workspace, boardId: number): Board {
        const board: Board | undefined = workSpace.boards.find((value: Board) => value.id == boardId)
        if (board == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `Board with ID ${boardId} cannot found in this work space`)
        return board
    }
    public async getAllMemberFromBoard(board: Board): Promise<CustomSuccessfulResponse> {
        if (board.users == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `User cannot found in this board`)
        return new CustomSuccessfulResponse(StatusCodes.OK, `All members from board ${board.name} had been found`, board.users)
    }
    public async addMemberToBoard(board: Board, email: string): Promise<CustomSuccessfulResponse> {
        const user: User = await this.userRepository.findByEmail(email)
        if (board.users.find((value: User) => value.id == user.id) != undefined)
            throw new CustomError(StatusCodes.BAD_REQUEST, `User with ID ${user.id} had been add to board ${board.name}`)
        board.users.push(user)
        await this.boardReposiory.update(board.id, board)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, `User with ID ${user.id} had been add to board ${board.name}`, board)
    }
    public async removeMemberFromBoard(board: Board, userId: number): Promise<CustomSuccessfulResponse> {
        const user: User | undefined = board.users.find((value: User) => value.id == userId)
        if (user == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `User with ID ${userId} cannot found in this board`)
        if (board.admin.id == userId)
            throw new CustomError(StatusCodes.FORBIDDEN, `User with ID ${userId} cannot remove himself from board ${board.name}`)
        board.users = board.users.filter((value: User) => value.id != userId)
        const updatedBoard = { ...board, users: board.users };
        await this.boardReposiory.update(board.id, updatedBoard);
        return new CustomSuccessfulResponse(StatusCodes.OK, `User with ID ${userId} had been remove from board ${board.name}`, board)
    }  
}
export default new boardService()