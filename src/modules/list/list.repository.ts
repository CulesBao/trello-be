import { baseRepository } from "../../common/base.repository";
import { List } from "./List.entity";
import { StatusCodes } from "http-status-codes";
import CustomError from "../../middleware/CustomError";
import cacheService from "../../service/cache.service";
import { TrelloEnum } from '../../common/types/trello'

class listRepository extends baseRepository<List> {
    public async createList(list: List): Promise<List> {
        const newList = await this.repository.save(list)
        await cacheService.set(`${TrelloEnum.List} + ${newList.id}`, newList)

        return newList
    }
    public override async findById(id: number): Promise<List> {
        const listCache: Object | string | null = null
        if (listCache) {
            return listCache as List
        }
        const list: List | null = await this.repository.findOne({
            where: { id },
            relations: ['board.users', 'board', 'cards']
        })
        if (!list)
            throw new CustomError(StatusCodes.NOT_FOUND, `List with id ${id} not found`)
        console.log(list)
        await cacheService.set(`${TrelloEnum.List} + ${id}`, list)
        return list
    }
    public override async findAll(): Promise<List[]> {
        return await this.repository.find({
            relations: ['board', 'cards']
        })
    }
    public override async update(id: number, updatedList: List): Promise<List> {
        await this.repository.update(id, updatedList)
        await cacheService.del(`${TrelloEnum.List} + ${id}`)
        const updatedEntity = await this.findById(id)
        await cacheService.set(`${TrelloEnum.List} + ${id}`, updatedEntity)
        return updatedEntity
    }
}
export default new listRepository(List)