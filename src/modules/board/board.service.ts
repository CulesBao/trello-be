import { CustomSuccessfulResponse } from "../../template/response.dto"
import CustomError from "../../utils/CustomError"
import { Workspace } from "../workspace/entity/Workspace"
import { BoardRepository } from "./board.repository"
import { Board } from "./entity/Board"
import { StatusCodes } from "http-status-codes"
class boardService {
    private boardReposiory = new BoardRepository(Board)
    public async addNewBoardToWorkSpace(workSpace: Workspace, board: Board): Promise<CustomSuccessfulResponse> {
        const newBoard : Board = await this.boardReposiory.addBoard(workSpace, board)
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
}
export default new boardService()