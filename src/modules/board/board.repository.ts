import { baseRepository } from "../../template/base.repository";
import { Workspace } from "../workspace/entity/Workspace";
import { Board } from "./entity/Board";
import { WorkSpaceRepository } from "../workspace/workspace.repository";
import CustomError from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";
import cacheService from "../cache/cache.service";
import { TrelloEnum } from "../../types/trello";
import { User } from "../user/entity/User";

export class BoardRepository extends baseRepository<Board> {
    public async createBoard(board: Board, workSpace: Workspace, user: User): Promise<Board> {
        board.lists = []
        board.workspace = workSpace
        board.admin = user
        board.users = [user]
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
        const boardCache = await cacheService.get(`${TrelloEnum.Board} + ${id}`)
        let board: Board | null
        if (boardCache == null) {
            board = await this.repository.findOne({
                where: { id: id },
                relations: ['lists', 'admin', 'users', 'workspace']
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
        const board: Board = await super.update(id, entity)
        await cacheService.set(`${TrelloEnum.Board} + ${id}`, board)
        return board
    }
    public override async delete(id: number): Promise<void> {
        await super.delete(id)
        await cacheService.del(`${TrelloEnum.Board} + ${id}`)
    }
}
export default new BoardRepository(Board)