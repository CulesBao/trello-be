import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Workspace } from "../../workspace/entity/Workspace";
import { baseEntity } from "../../../template/baseEntity";
import { List } from "../../list/entity/List";

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
}