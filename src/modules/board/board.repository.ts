import { baseRepository } from '../../common/base.repository'
import { Workspace } from "../workspace/Workspace.entity";
import { Board } from "./Board.entity";
import { NotFound } from '../../handler/failed.handler';
import { MessageConstant } from '../../common/constants/message.constants';

export class BoardRepository extends baseRepository<Board> {
    public async createBoard(board: Board): Promise<Board> {
        await this.repository.save(board)

        return board
    }

    public async getBoardById(workSpace: Workspace, boardId: number): Promise<Board> {
        const board: Board | undefined = workSpace.boards.find((board: Board) => board?.id == boardId)
        if (board == undefined)
            throw new NotFound(MessageConstant.Board.NOT_FOUND)
        return board
    }
    public override async findById(id: number): Promise<Board> {
        const board = await super.findById(id)
        if (board == undefined)
            throw new NotFound(MessageConstant.Board.NOT_FOUND)
        return board
    }
    public override async update(id: number, entity: Board): Promise<Board> {
        const board = await super.update(id, entity)
        return board
    }
    public override async delete(id: number): Promise<void> {
        await super.delete(id)
    }
}
export default new BoardRepository(Board)