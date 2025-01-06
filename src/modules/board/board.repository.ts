import { baseRepository } from '../../common/base.repository'
import { Board } from "./Board.entity";
import { NotFound } from '../../handler/failed.handler';
import { MessageConstant } from '../../common/message.constants';

export class BoardRepository extends baseRepository<Board> {
    public async createBoard(board: Board): Promise<Board> {
        await this.repository.save(board)
        return board
    }
    public async findByListId(listId: number): Promise<Board> {
        const board: Board | null = await this.repository.createQueryBuilder('board')
            .innerJoin('board.lists', 'list')
            .where('list.id = :listId', { listId })
            .getOne()
        if (board == null)
            throw new NotFound(MessageConstant.Board.NOT_FOUND)
        return board
    }
    public override async findById(id: number): Promise<Board> {
        const board: Board | null = await this.repository.findOne({
            where: { id },
            relations: ['workspace', 'admin', 'users', 'lists']
        })
        if (board == null)
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