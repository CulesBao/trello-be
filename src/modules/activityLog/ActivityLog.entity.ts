import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { baseEntity } from "../../common/base.entity";
import { Column } from "typeorm";
import { User } from "../user/User.entity";
import { Board } from "../board/Board.entity";
import { List } from "../list/List.entity";
import { Card } from "../card/Card.entity";
import { CheckList } from "../checkList/CheckList.entity";
import { Comment } from "../comment/Comment.entity";

@Entity()
export class ActivityLog extends baseEntity {
    public setUser(user: User) {
        this.user = user
    }
    public setBoard(board: Board) {
        this.board = board
    }
    public setAction(action: string) {
        this.action = action
    }
    public setList(list: List) {
        this.list = list
    }
    public setCard(card: Card) {
        this.card = card
    }
    public setAffectedUser(affectedUser: User) {
        this.affectedUser = affectedUser
    }
    public setComment(comment: Comment) {
        this.comment = comment
    }
    public setCheckList(checkList: CheckList) {
        this.checkList = checkList
    }
    @Column({ type: "varchar", length: 200, nullable: false })
    action!: string

    @ManyToOne(() => User, user => user.activityLogs)
    @JoinColumn({ name: "userId" })
    user!: User

    @ManyToOne(() => Board, board => board.activityLogs)
    @JoinColumn({ name: "boardId" })
    board!: Board

    @ManyToOne(() => List, list => list.activityLogs)
    @JoinColumn({ name: "listId" })
    list: List | null = null

    @ManyToOne(() => Card, card => card.activityLogs)
    @JoinColumn({ name: "cardId" })
    card: Card | null = null

    @ManyToOne(() => Comment, comment => comment.activityLogs)
    @JoinColumn({ name: "commentId" })
    comment: Comment | null = null

    @ManyToOne(() => CheckList, checkList => checkList.activityLogs)
    @JoinColumn({ name: "checkListId" })
    checkList: CheckList | null = null

    @ManyToOne(() => User, user => user.activityLogs, { nullable: true })
    @JoinColumn({ name: "affectedUserId" })
    affectedUser: User | null = null
}