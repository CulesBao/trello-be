import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import CustomError from "../middleware/CustomError";
import { StatusCodes } from "http-status-codes";
import { baseEntity } from "./base.entity";
export abstract class baseRepository<T extends baseEntity> {
    protected repository: Repository<T>;

    constructor(entity: { new(): T }) {
        this.repository = AppDataSource.getRepository(entity);
    }
    public async create(entity: T): Promise<T> {
        return this.repository.save(entity)
    }
    public async findAll(): Promise<T[]> {
        return await this.repository.find()
    }
    public async findByField(field: string, value: any): Promise<T> {
        const entity = await this.repository.findOne({
            where: {
                [field]: value
            } as any
        })
        if (!entity)
            throw new CustomError(StatusCodes.NOT_FOUND, `Entity with ${field} ${value} not found`)
        return entity
    }
    public async findById(id: number): Promise<T> {
        const entity = await this.repository.findOne(id as any)
        if (!entity)
            throw new CustomError(StatusCodes.NOT_FOUND, `Entity with id ${id} not found`)
        return entity
    }
    public async update(id: number, entity: T): Promise<T> {
        const entityToUpdate = await this.findByField('id', id)
        return this.repository.save({ ...entityToUpdate, ...entity })
    }
    public async delete(id: number): Promise<void> {
        await this.repository.delete(id as any)
    }
}
