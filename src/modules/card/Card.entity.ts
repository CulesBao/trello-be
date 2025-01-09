import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { baseEntity } from "../../common/base.entity";
import { List } from "../list/List.entity";
import { Comment } from "../comment/Comment.entity";
import { CheckList } from "../checkList/CheckList.entity";
import { Attachment } from "../attachment/Attachment.entity";

@Entity()
export class Card extends baseEntity {
    @Column({ type: "varchar", length: 100, nullable: false })
    title!: string

    @Column({ type: "varchar", length: 256, nullable: true })
    description?: string

    @Column({ type: "int", nullable: false })
    order!: number

    @ManyToOne(() => List, list => list.cards, { onDelete: "CASCADE" })
    @JoinColumn({ name: "listId" })
    list!: List

    @OneToMany(() => Comment, comment => comment.card)
    comments!: Comment[]

    @OneToMany(() => CheckList, checkList => checkList.card)
    checkLists!: CheckList[]

    @OneToMany(() => Attachment, attachment => attachment.card)
    attachments!: Attachment[]
}