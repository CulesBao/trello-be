import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "../../user/entity/User";
import { Permission } from "../../permissions/entity/Permission";
import { baseEntity } from "../../../template/baseEntity";

@Entity()
export class Role extends baseEntity {
    @Column({ length: 100 })
    name!: string
    @Column({ length: 100, nullable: true })
    description?: string

    @ManyToMany(() => User, user => user.roles)
    users!: User[]


    @ManyToMany(() => Permission, permission => permission.roles, { onDelete: "CASCADE" })
    @JoinTable({
        name: "role_permissions",
        joinColumn: { name: "roleId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "permissionId", referencedColumnName: "id" }
    })
    permissions!: Permission[]
}