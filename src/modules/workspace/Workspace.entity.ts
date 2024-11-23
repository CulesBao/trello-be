import { JoinTable, Column, ManyToMany, ManyToOne, Entity, OneToMany } from "typeorm";
import { baseEntity } from "../../common/base.entity";
import { User } from "../user/User.entity";
import { Board } from "../board/Board.entity";
@Entity()
export class Workspace extends baseEntity {
    @Column({ type: "varchar", length: 100, nullable: false })
    name!: string
    @Column({ type: "varchar", length: 100, nullable: true })
    description?: string

    @OneToMany(() => Board, board => board.workspace, { onDelete: "CASCADE" })
    boards!: Board[]

    @ManyToMany(() => User, user => user.workspacess, { onDelete: "CASCADE" })
    @JoinTable({
        name: "admins_workspaces",
        joinColumn: { name: "workspaceId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "userId", referencedColumnName: "id" }
    })
    admin!: User[]

    @ManyToMany(() => User, user => user.workspaces, { onDelete: "CASCADE" })
    @JoinTable({
        name: "users_workspaces",
        joinColumn: { name: "workspaceId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "userId", referencedColumnName: "id" }
    })
    users!: User[]
}