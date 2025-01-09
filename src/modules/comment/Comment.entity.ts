import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { baseEntity } from "../../common/base.entity";
import { User } from "../user/User.entity";
import { Card } from "../card/Card.entity";

@Entity()
export class Comment extends baseEntity{
    @Column({type: "varchar", length: 500, nullable: false})
    content!: string

    @ManyToOne(() => User, user => user.comments, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId"})
    user!: User

    @ManyToOne(() => Card, card => card.comments, {onDelete: "CASCADE"})
    @JoinColumn({name: "cardId"})
    card!: Card
}