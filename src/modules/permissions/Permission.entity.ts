import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Role } from "../roles/Role.entity";
import { baseEntity } from "../../common/base.entity";

@Entity()
export class Permission extends baseEntity {
    @Column({ length: 100, nullable: false })
    name!: string

    @Column({ length: 100, nullable: true })
    description?: string

    @ManyToMany(() => Role, role => role.permissions)
    roles!: Role[]
}