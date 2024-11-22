import { baseRepository } from "../../template/base.repository";
import { Workspace } from "./entity/Workspace";
import CustomError from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";
import { User } from "../user/entity/User";

export class WorkSpaceRepository extends baseRepository<Workspace> {
    public override async findById(id: number): Promise<Workspace> {
        const entity = await this.repository.findOne({
            where: {
                id
            },
            relations: ['admin', 'users', 'boards']
        })
        if (!entity)
            throw new CustomError(StatusCodes.NOT_FOUND, `Workspace with id ${id} not found`)
        return entity
    }
    public async getMyWorkSpace(userId: number): Promise<Workspace[]> {
        const workSpaces: Workspace[] = await this.repository.find({
            where: {
            admin: {
                id: userId
            }
            },
            relations: ['admin', 'users', 'boards']
        });
        return workSpaces
    }
    public async getField(id: number, field: string): Promise<any> {
        const workspace = await this.findByField('id', id)
        if (workspace[field] == null)
            throw new CustomError(StatusCodes.BAD_REQUEST, "Field invalid!")
        return workspace[field]
    }
    public async addMemberToWorkSpace(workspace: Workspace, user: User): Promise<Workspace> {
        workspace.users.push(user)
        await this.repository.save(workspace)
        return workspace
    }
    public async getMemberById(workspaceId: number, userId: number): Promise<User> {
        const workspace = await this.findByField('id', workspaceId)
        const user: User | undefined = workspace.users.find((value) => value.id == userId)
        if (user == undefined)
            throw new CustomError(StatusCodes.BAD_REQUEST, "User id is invalid")
        return user
    }
    public async deleteMemberOutOfWorkspace(workspaceId: number, userId: number) {
        const workSpace = await this.findById(workspaceId)
        workSpace.users = workSpace.users.filter((value: User) => value.id !== userId)
        this.repository.save(workSpace)
    }
}