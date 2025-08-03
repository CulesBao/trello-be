import { JoinTable, Column, ManyToMany, ManyToOne, Entity, OneToMany } from "typeorm";
import { baseEntity } from "../../common/base.entity";
import { User } from "../user/User.entity";
import { Board } from "../board/Board.entity";
import { AssignRole } from "../assignRole/AssignRole.entity";
@Entity()
export class Workspace extends baseEntity {
    @Column({ type: "varchar", length: 100, nullable: false })
    name!: string
    @Column({ type: "varchar", length: 100, nullable: true })
    description?: string

    @OneToMany(() => Board, board => board.workspace)
    boards!: Board[]

    @ManyToMany(() => User, user => user.workspacess)
    @JoinTable({
        name: "admins_workspaces",
        joinColumn: { name: "workspaceId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "userId", referencedColumnName: "id" }
    })
    admin!: User[]

    @ManyToMany(() => User, user => user.workspaces)
    @JoinTable({
        name: "users_workspaces",
        joinColumn: { name: "workspaceId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "userId", referencedColumnName: "id" }
    })
    users!: User[]

    @OneToMany(() => AssignRole, assignRole => assignRole.workspace)
    assignRoles!: AssignRole[]
}