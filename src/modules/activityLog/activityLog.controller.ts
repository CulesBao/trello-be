import { Request, Response, NextFunction } from 'express';
import activityLogService from './activityLog.servce';
import { User } from '../user/User.entity';
import { ActivityLog } from './ActivityLog.entity';
import boardRepository from '../board/board.repository';
import { OK } from '../../handler/success.handler';
import cardRepository from '../card/card.repository';
import listRepository from '../list/list.repository';
import commentRepository from '../comment/comment.repository';
import checkListRepository from '../checkList/checkList.repository';
import notificationController from '../notification/notification.controller';


class activityLogController {
    public async getActivityLog(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const boardId: number = Number(req.params.id)
            const activityLogs: String[] = await activityLogService.getActivityLog(boardId)

            new OK(res, "Activity logs had been found", activityLogs)
        } catch (error: unknown) {
            next(error)
        }
    }
    public async BoardActivity(user: User, boardId: number, action: string, affectedUser?: User): Promise<void> {
        const activityLog = new ActivityLog()
        activityLog.setUser(user)
        activityLog.setBoard(await boardRepository.findById(boardId))
        activityLog.setAction(action)
        if (affectedUser)
            activityLog.setAffectedUser(affectedUser)

        const newActivityLog: ActivityLog = await activityLogService.saveActivityLog(activityLog)
        await notificationController.sendNotification(newActivityLog)
    }
    public async ListActivity(user: User, boardId: number, action: string, listId: number): Promise<void> {
        const activityLog = new ActivityLog()

        activityLog.setUser(user)
        activityLog.setBoard(await boardRepository.findById(boardId))
        activityLog.setAction(action)
        activityLog.setList(await listRepository.findById(listId))

        const newActivityLog: ActivityLog = await activityLogService.saveActivityLog(activityLog)
        await notificationController.sendNotification(newActivityLog)
    }
    public async CardActivity(user: User, boardId: number, action: string, cardId: number): Promise<void> {
        const activityLog = new ActivityLog()

        activityLog.setUser(user)
        activityLog.setBoard(await boardRepository.findById(boardId))
        activityLog.setAction(action)
        activityLog.setCard(await cardRepository.findById(cardId))

        const newActivityLog: ActivityLog = await activityLogService.saveActivityLog(activityLog)
        await notificationController.sendNotification(newActivityLog)
    }
    public async CommentActivity(user: User, boardId: number, action: string, commentId: number): Promise<void> {
        const activityLog = new ActivityLog()

        activityLog.setUser(user)
        activityLog.setBoard(await boardRepository.findById(boardId))
        activityLog.setAction(action)
        activityLog.setComment(await commentRepository.findById(commentId))

        const newActivityLog: ActivityLog = await activityLogService.saveActivityLog(activityLog)
        await notificationController.sendNotification(newActivityLog)
    }
    public async saveCheckListActivity(user: User, boardId: number, action: string, checkListId: number): Promise<void> {
        const activityLog = new ActivityLog()
        activityLog.setUser(user)
        activityLog.setBoard(await boardRepository.findById(boardId))
        activityLog.setAction(action)
        activityLog.setCheckList(await checkListRepository.findById(checkListId))

        const newActivityLog: ActivityLog = await activityLogService.saveActivityLog(activityLog)
        await notificationController.sendNotification(newActivityLog)
    }
}

export default new activityLogController()