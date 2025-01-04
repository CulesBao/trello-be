import { baseRepository } from "../../common/base.repository";
import { MessageConstant } from "../../common/message.constants";
import { NotFound } from "../../handler/failed.handler";
import { List } from "./List.entity";

class listRepository extends baseRepository<List> {
    public async createList(list: List): Promise<List> {
        const newList = await this.repository.save(list)
        return newList
    }
    public override async findById(id: number): Promise<List> {
        const list: List | null = await this.repository.findOne({
            where: { id },
            relations: ['board.users', 'board', 'cards']
        })
        if (!list)
            throw new NotFound(MessageConstant.List.NOT_FOUND)
        return list
    }
    public override async findAll(): Promise<List[]> {
        return await this.repository.find({
            relations: ['board', 'cards']
        })
    }
    public override async update(id: number, updatedList: List): Promise<List> {
        await this.repository.update(id, updatedList)
        const updatedEntity = await this.findById(id)
        return updatedEntity
    }
}
export default new listRepository(List)