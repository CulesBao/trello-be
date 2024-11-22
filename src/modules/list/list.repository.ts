import { baseRepository } from "../../template/base.repository";
import { List } from "./entity/List";
import { StatusCodes } from "http-status-codes";
import CustomError from "../../utils/CustomError";

class listRepository extends baseRepository<List> {
    public override async findById(id: number): Promise<List> {
        const entity = await this.repository.findOne({
            where: {
                id: id
            },
            relations: ['board', 'cards']
        })
        if (!entity)
            throw new CustomError(StatusCodes.NOT_FOUND, `List with id ${id} not found`)
        return entity
    }
    public override async findAll(): Promise<List[]> {
        return await this.repository.find({
            relations: ['board', 'cards']
        })
    }
}
export default new listRepository(List)