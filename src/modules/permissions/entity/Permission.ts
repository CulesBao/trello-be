import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Role } from "../../roles/entity/Role";
import { baseEntity } from "../../../template/baseEntity";

@Entity()
export class Permission extends baseEntity {
    @Column({length: 100, nullable: false})
    name!: string

    @Column({length: 100, nullable: true})
    description?: string

    @ManyToMany(() => Role, role => role.permissions)
    roles!: Role[]
}