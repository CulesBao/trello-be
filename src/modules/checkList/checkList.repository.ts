import { baseRepository } from "../../common/base.repository";
import { MessageConstant } from "../../common/message.constants";
import { NotFound } from "../../handler/failed.handler";
import { CheckList } from "./CheckList.entity";

class checkListRepository extends baseRepository<CheckList> {
    public override async create(checkList: CheckList): Promise<CheckList> {
        const newCheckList: CheckList = await this.repository.save(checkList)
        return newCheckList
    }

    public override async findById(id: number): Promise<CheckList> {
        const checkList: CheckList | null = await this.repository.findOne({
            where: {
                id
            },
            relations: ['card']
        })
        if (!checkList)
            throw new NotFound(MessageConstant.CheckList.NOT_FOUND)
        return checkList
    }
    public override async update(id: number, checkList: CheckList): Promise<CheckList> {
        await this.repository.update(id, checkList)
        const updatedCheckList: CheckList = await this.findById(id)
        return updatedCheckList
    }
    public override async delete(id: number): Promise<void> {
        await this.findById(id)
        await this.repository.delete(id)
    }
}
export default new checkListRepository(CheckList)