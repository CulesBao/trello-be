import { ActivityLog } from "../activityLog/ActivityLog.entity";
import { BoardDTOForWorkSpace } from "../board/board.dto";
import { CardDTOForList } from "../card/card.dto";
import { CheckListDTOForCard } from "../checkList/checkList.dto";
import { CommentDTOForCard } from "../comment/comment.dto";
import { ListDTOForBoard } from "../list/list.dto";
import { UserDTOForAll } from "../user/user.dto";

export class NotificationResponseDTO{
    user: UserDTOForAll
    action: string
    board: BoardDTOForWorkSpace
    list?: ListDTOForBoard
    card?: CardDTOForList 
    comment?: CommentDTOForCard
    checkList?: CheckListDTOForCard 
    affectedUser?: UserDTOForAll 
    createAt: Date
    constructor(activityLog: ActivityLog) {
        this.user = new UserDTOForAll(activityLog.user)
        this.action = activityLog.action
        this.board = new BoardDTOForWorkSpace(activityLog.board)
        if(activityLog.list){
            this.list = new ListDTOForBoard(activityLog.list)
        }
        if(activityLog.card){
            this.card = new CardDTOForList(activityLog.card)
        }
        if(activityLog.comment){
            this.comment = new CommentDTOForCard(activityLog.comment)
        }
        if(activityLog.checkList){
            this.checkList = new CheckListDTOForCard(activityLog.checkList)
        }
        if(activityLog.affectedUser){
            this.affectedUser = new UserDTOForAll(activityLog.affectedUser)
        }
        this.createAt = activityLog.createAt
    }
}