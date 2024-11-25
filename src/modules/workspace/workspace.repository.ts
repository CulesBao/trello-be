import { baseRepository } from "../../common/base.repository";
import { Workspace } from "./Workspace.entity";
import CustomError from "../../middleware/CustomError";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/User.entity";
import cacheService from "../../service/cache.service";
import { TrelloEnum } from "../../common/enums/trello.enum";

export class WorkSpaceRepository extends baseRepository<Workspace> {
    public override async findById(id: number): Promise<Workspace> {
        const workSpaceCache = await cacheService.get(`${TrelloEnum.Workspace} + ${id}`)
        let workSpace: Workspace | null;
        if (workSpaceCache == null) {
            workSpace = await this.repository.findOne({
                where: {
                    id
                },
                relations: ['admin', 'users', 'boards'],
                select: ['id', 'name', 'admin', 'users', 'boards']
            })
        }
        else
            workSpace = (typeof workSpaceCache == 'string') ? JSON.parse(workSpaceCache) : workSpaceCache
        if (!workSpace)
            throw new CustomError(StatusCodes.NOT_FOUND, `Workspace with id ${id} not found`)
        return workSpace
    }
    public async getMyWorkSpace(userId: number): Promise<Workspace[]> {
        const workSpaces: Workspace[] = await this.repository.find({
            relations: ['admin', 'users', 'boards'],
            select: ['id', 'name', 'admin', 'users', 'boards']
        });

        return workSpaces.filter((value: Workspace) => value.users.find((user: User) => user.id === userId))
    }
    public async getField(id: number, field: string): Promise<any> {
        const workspace = await this.findByField('id', id)
        if (workspace[field] == null)
            throw new CustomError(StatusCodes.BAD_REQUEST, "Field invalid!")
        return workspace[field]
    }
    public async addMemberToWorkSpace(workspace: Workspace, user: User): Promise<Workspace> {
        workspace.users.push(user)
        await cacheService.set(`${TrelloEnum.Workspace} + ${workspace.id}`, workspace)
        await this.repository.save(workspace)
        return workspace
    }
    public async deleteMemberOutOfWorkspace(workspaceId: number, userId: number) {
        const workSpace = await this.findById(workspaceId)
        workSpace.users = workSpace.users.filter((value: User) => value.id !== userId)
        await this.repository.save(workSpace)
        this.repository.save(workSpace)
    }
    public override async create(entity: Workspace): Promise<Workspace> {
        const workspace = await this.repository.save(entity)
        await cacheService.set(`${TrelloEnum.Workspace} + ${workspace.id}`, workspace)
        return workspace
    }
    public override async delete(id: number): Promise<void> {
        await this.findById(id)
        await this.repository.delete(id)
        await cacheService.del(`${TrelloEnum.Workspace} + ${id}`)
    }
    public override async update(id: number, entity: Workspace): Promise<Workspace> {
        const workSpace = await super.update(id, entity)
        await cacheService.set(`${TrelloEnum.Workspace} + ${id}`, workSpace)
        return workSpace
    }
}