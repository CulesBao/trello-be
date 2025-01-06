import activityLogRepository from "./activityLog.repository"
import { ActivityLog } from "./ActivityLog.entity"

class activityLogService{
    public async getActivityLog(boardId: number): Promise<String[]> {
        const activityLogs: String[] = await activityLogRepository.findByBoardId(boardId)
        return activityLogs
    }
    public async saveActivityLog(activityLog: ActivityLog): Promise<ActivityLog> {
        return await activityLogRepository.create(activityLog)
    }
}

export default new activityLogService()