import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Workspace } from "../workspace/Workspace.entity";
import { baseEntity } from "../../common/base.entity";
import { List } from "../list/List.entity";
import { User } from "../user/User.entity";

@Entity()
export class Board extends baseEntity {
    @Column({ type: "varchar", length: 100, nullable: false })
    name!: string

    @Column({ type: "varchar", length: 100, nullable: true })
    description?: string

    @OneToMany(() => List, list => list.board)
    lists!: List[]

    @ManyToOne(() => Workspace, workspace => workspace.boards, { onDelete: "CASCADE" })
    @JoinColumn({ name: "workspaceId" })
    workspace!: Workspace

    @ManyToMany(() => User, user => user.boards)
    @JoinTable({
        name: "users_boards",
        joinColumn: { name: "boardId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "userId", referencedColumnName: "id" }
    })
    users!: User[]

    @ManyToOne(() => User, user => user.boardsAdmin)
    admin!: User
}