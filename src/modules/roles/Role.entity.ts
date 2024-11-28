import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "../permissions/Permission.entity";
import { baseEntity } from "../../common/base.entity";

@Entity()
export class Role extends baseEntity {
    @Column({ length: 100, unique: true })
    name!: string;

    @Column({ length: 255, nullable: true })
    description?: string;

    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable({
        name: "role_permissions",
        joinColumn: { name: "roleId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "permissionId", referencedColumnName: "id" }
    })
    permissions!: Permission[];
}