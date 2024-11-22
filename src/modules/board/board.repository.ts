import { baseRepository } from "../../template/base.repository";
import { Workspace } from "../workspace/entity/Workspace";
import { Board } from "./entity/Board";
import { WorkSpaceRepository } from "../workspace/workspace.repository";
import CustomError from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";

export class BoardRepository extends baseRepository<Board> {
    private workSpaceRepository: WorkSpaceRepository = new WorkSpaceRepository(Workspace)
    public async addBoard(workSpace: Workspace, board: Board): Promise<Board> {
        board.lists = []
        board.workspace = workSpace
        await this.repository.save(board)

        return board
    }
    public async getBoardById(workSpace: Workspace, boardId: number): Promise<Board> {
        const board: Board | undefined = workSpace.boards.find((value: Board) => board?.id == boardId)
        if (board == undefined)
            throw new CustomError(StatusCodes.NOT_FOUND, `Board with ID ${boardId} cannot found in this work space`)
        return board
    }
    public async getAllBoardByWorkSpace(workSpace: Workspace): Promise<Board[]> {
        const boards: Board[] = workSpace.boards
        return boards
    }
    public override async findById(id: number): Promise<Board> {
        const board: Board | null = await this.repository.findOne({
            where: {
                id: id
            },
            relations: ['lists', 'workspace']
        })
        if (board == null)
            throw new CustomError(StatusCodes.NOT_FOUND, `Board with ID ${id} cannot found`)
        return board
    }
}
export default new BoardRepository(Board)