import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { baseEntity } from "../../common/base.entity";
import { User } from "../user/User.entity";
import { Card } from "../card/Card.entity";

@Entity()
export class CheckList extends baseEntity {
    @Column({ type: "boolean", nullable: false, default: false })
    isDone!: boolean

    @Column({ type: "varchar", length: 200, nullable: false })
    content!: string

    @ManyToOne(() => User, user => user.checkLists, {cascade: true})
    @JoinColumn({name: "userId"})
    user!: User

    @ManyToOne(() => Card, card => card.checkLists, {cascade: true})
    @JoinColumn({name: "cardId"})
    card!: Card
}