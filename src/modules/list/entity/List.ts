import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { baseEntity } from "../../../template/baseEntity";
import { Board } from "../../board/entity/Board";
import { Card } from "../../card/entity/Card";

@Entity()
export class List extends baseEntity {
    @Column({ type: "varchar", length: 100, nullable: false })
    name!: string

    @Column({type: "int", nullable: false})
    order!: number

    @OneToMany(() => Card, card => card.list)
    cards!: Card[]

    @ManyToOne(() => Board, board => board.lists)
    @JoinColumn({name: "boardId"})
    board!: Board
}