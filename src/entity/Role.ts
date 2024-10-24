import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id!: number
    @Column({length: 100})
    name!: string
    @Column({length: 100, nullable: true})
    description?: string

    @ManyToMany(() => User, user => user.roles)
    users!: User[]


    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable()
    permissions!: Permission[]
}