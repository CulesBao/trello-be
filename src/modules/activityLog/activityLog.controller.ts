import { Request, Response, NextFunction } from 'express';
import { CustomSuccessfulResponse } from '../../middleware/successResponse.middleware';
import activityLogService from './activityLog.servce';
import { User } from '../user/User.entity';
import { Board } from '../board/Board.entity';
import { ActivityLog } from './ActivityLog.entity';
import { List } from '../list/List.entity';
import { Card } from '../card/Card.entity';
import { Comment } from '../comment/Comment.entity';
import { CheckList } from '../checkList/CheckList.entity';


class activityLogController {
    public async getActivityLog(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const boardId: number = req.board.id
            const response: CustomSuccessfulResponse = await activityLogService.getActivityLog(boardId)

            res.status(response.status).json({
                message: response.message,
                data: response.data
            })
        } catch (error: unknown) {
            next(error)
        }
    }
    public async BoardActivity(user: User, board: Board, action: string, affectedUser?: User): Promise<void> {
        const activityLog = new ActivityLog()
        activityLog.setUser(user)
        activityLog.setBoard(board)
        activityLog.setAction(action)
        affectedUser && activityLog.setAffectedUser(affectedUser)

        await activityLogService.saveActivityLog(activityLog)
    }
    public async ListActivity(user: User, board: Board, action: string, list: List): Promise<void> {
        const activityLog = new ActivityLog()
        activityLog.setUser(user)
        activityLog.setBoard(board)
        activityLog.setAction(action)
        activityLog.setList(list)

        await activityLogService.saveActivityLog(activityLog)
    }
    public async CardActivity(user: User, board: Board, action: string, card: Card): Promise<void> {
        const activityLog = new ActivityLog()
        activityLog.setUser(user)
        activityLog.setBoard(board)
        activityLog.setAction(action)
        activityLog.setCard(card)

        await activityLogService.saveActivityLog(activityLog)
    }
    public async CommentActivity(user: User, board: Board, action: string, comment: Comment): Promise<void> {
        const activityLog = new ActivityLog()
        activityLog.setUser(user)
        activityLog.setBoard(board)
        activityLog.setAction(action)
        activityLog.setComment(comment)

        await activityLogService.saveActivityLog(activityLog)
    }
    public async saveCheckListActivity(user: User, board: Board, action: string, checkList: CheckList): Promise<void> {
        const activityLog = new ActivityLog()
        activityLog.setUser(user)
        activityLog.setBoard(board)
        activityLog.setAction(action)
        activityLog.setCheckList(checkList)

        await activityLogService.saveActivityLog(activityLog)
    }
}

export default new activityLogController()