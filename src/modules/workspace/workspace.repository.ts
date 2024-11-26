import { baseRepository } from "../../common/base.repository";
import { Workspace } from "./Workspace.entity";
import { NotFound } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/constants/message.constants";

class workSpaceRepository extends baseRepository<Workspace> {
    public override async create(entity: Workspace): Promise<Workspace> {
        const workspace = await this.repository.save(entity)
        return workspace
    }
    public override async findById(id: number): Promise<Workspace> {
        const workSpace: Workspace | null = await this.repository.findOne({
            where: { id },
            relations: ['admin', 'users', 'boards']
        })
        if (!workSpace)
            throw new NotFound(MessageConstant.WorkSpace.NOT_FOUND)
        return workSpace
    }
    public async getMyWorkSpace(userId: number): Promise<Workspace[]> {
        const workSpaces: Workspace[] = await this.repository.find({
            where: {
                users: { id: userId }
            },
            relations: ['admin', 'users', 'boards']
        });
        
        return workSpaces
    }
    public override async update(id: number, entity: Workspace): Promise<Workspace> {
        const workSpace = await super.update(id, entity)
        return workSpace
    }
    public override async delete(id: number): Promise<void> {
        await this.findById(id)
        await this.repository.delete(id)
    }
}
export default new workSpaceRepository(Workspace)