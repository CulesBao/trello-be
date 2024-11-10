import { Entity, Column, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { Role } from "../../roles/entity/Role"
import { baseEntity } from "../../../template/baseEntity"
import { Workspace } from "../../workspace/entity/Workspace"

@Entity()
export class User extends baseEntity {
    @Column({ length: 100, nullable: false })
    name!: string

    @Column({ length: 100, unique: true, nullable: false })
    email!: string

    @Column({ length: 100, unique: true, nullable: false })
    username!: string

    @Column({ length: 100, nullable: false })
    password!: string

    @Column({ nullable: true, default: null, length: 10 })
    phoneNumber?: string

    @Column({ type: "date", nullable: true, default: null })
    birthDate?: Date

    @OneToMany(() => Workspace, workspace => workspace.owner)
    ownerWorkspaces!: Workspace

    @ManyToMany(() => Workspace, workspace => workspace.users)
    workspaces!: Workspace[]

    @ManyToMany(() => Role, role => role.users, { onDelete: "CASCADE" })
    @JoinTable({
        name: "user_roles",
        joinColumn: { name: "userId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "roleId", referencedColumnName: "id" }
    })
    roles!: Role[]
}
