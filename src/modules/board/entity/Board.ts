import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Workspace } from "../../workspace/entity/Workspace";
import { baseEntity } from "../../../template/baseEntity";
import { List } from "../../list/entity/List";
import { User } from "../../user/entity/User";

@Entity()
export class Board extends baseEntity {
    @Column({ type: "varchar", length: 100, nullable: false })
    name!: string

    @Column({ type: "varchar", length: 100, nullable: true })
    description?: string

    @OneToMany(() => List, list => list.board)
    lists!: List[]

    @ManyToOne(() => Workspace, workspace => workspace.boards)
    @JoinColumn({ name: "workspaceId" })
    workspace!: Workspace

    @ManyToMany(() => User, user => user.boards, {onDelete: "CASCADE"})
    @JoinTable({
        name: "users_boards",
        joinColumn: {name: "boardId", referencedColumnName: "id"},
        inverseJoinColumn: {name: "userId", referencedColumnName: "id"}
    })
    users!: User[]

    @ManyToOne(() => User, user => user.boardsAdmin, {onDelete: "CASCADE"})
    admin!: User
}