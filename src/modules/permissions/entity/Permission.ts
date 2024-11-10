import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Role } from "../../roles/entity/Role";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id!: number
    @Column({length: 100})
    name!: string
    @Column({length: 100, nullable: true})
    description?: string

    @ManyToMany(() => Role, role => role.permissions)
    roles!: Role[]
}