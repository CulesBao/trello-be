import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { baseEntity } from "../../common/base.entity";
import { List } from "../list/List.entity";

@Entity()
export class Card extends baseEntity {
    @Column({ type: "varchar", length: 100, nullable: false })
    title!: string

    @Column({ type: "varchar", length: 256, nullable: true })
    description?: string

    @Column({ type: "int", nullable: false })
    order!: number

    @ManyToOne(() => List, list => list.cards, {onDelete: 'CASCADE', cascade: true})
    @JoinColumn({ name: "listId" })
    list!: List
}