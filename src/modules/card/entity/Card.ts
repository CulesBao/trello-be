import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { baseEntity } from "../../../template/baseEntity";
import { List } from "../../list/entity/List";

@Entity()
export class Card extends baseEntity {
    @Column({ type: "varchar", length: 100, nullable: false })
    title!: string

    @Column({ type: "varchar", length: 256, nullable: true })
    description?: string

    @Column({ type: "int", nullable: false })
    order!: number

    @Column({ type: "date", nullable: true })
    dueDate?: Date

    @ManyToOne(() => List, list => list.cards)
    @JoinColumn({ name: "listId" })
    list!: List
}