import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { baseEntity } from "../../common/base.entity";
import { User } from "../user/User.entity";
import { Card } from "../card/Card.entity";

@Entity()
export class Attachment extends baseEntity{
    @Column({type: 'varchar', length: 255, nullable: false})
    url!: string;

    @ManyToOne(() => User, user => user.attachments, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user!: User;

    @ManyToOne(() => Card, card => card.attachments, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'card_id'})
    card!: Card;
}