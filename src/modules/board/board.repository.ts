import { baseRepository } from '../../common/base.repository'
import { Workspace } from "../workspace/Workspace.entity";
import { Board } from "./Board.entity";
import CustomError from "../../middleware/CustomError";
import { StatusCodes } from "http-status-codes";
import cacheService from '../../service/cache.service';
import { TrelloEnum } from '../../common/enums/trello.enum'

export class BoardRepository extends baseRepository<Board> {
    public async createBoard(board: Board): Promise<Board> {
        await this.repository.save(board)
        await cacheService.set(`${TrelloEnum.Board} + ${board.id}`, board)

        return board
    }

    public async getBoardById(workSpace: Workspace, boardId: number): Promise<Board> {
        const board: Board | undefined = workSpace.boards.find((board: Board) => board?.id == boardId)
        if (board == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `Board with ID ${boardId} cannot found in this work space`)
        return board
    }
    public async getAllBoardByWorkSpace(workSpace: Workspace): Promise<Board[]> {
        const boards: Board[] = workSpace.boards
        return boards
    }
    public override async findById(id: number): Promise<Board> {
        const boardCache = null
        let board: Board | null
        if (boardCache == null) {
            board = await this.repository.findOne({
                where: { id: id },
                relations: ['lists', 'admin', 'users']
            })
            if (board == undefined)
                throw new CustomError(StatusCodes.NOT_FOUND, `Board with ID ${id} cannot found`)
            await cacheService.set(`${TrelloEnum.Board} + ${id}`, board)
        }
        else {
            board = typeof boardCache === 'string' ? JSON.parse(boardCache) : boardCache as Board
        }
        await cacheService.set(`${TrelloEnum.Board} + ${id}`, board)
        if (board == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `Board with ID ${id} cannot found`)
        return board
    }
    public override async update(id: number, entity: Board): Promise<Board> {
        const board = await super.update(id, entity)
        return board
    }
    public override async delete(id: number): Promise<void> {
        await super.delete(id)
        await cacheService.del(`${TrelloEnum.Board} + ${id}`)
    }
}
export default new BoardRepository(Board)