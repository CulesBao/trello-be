import { StatusCodes } from "http-status-codes"
import { CustomSuccessfulResponse } from "../../middleware/successResponse.middleware"
import activityLogRepository from "./activityLog.repository"
import { ActivityLog } from "./ActivityLog.entity"

class activityLogService{
    public async getActivityLog(boardId: number): Promise<CustomSuccessfulResponse> {
        const activityLogs: String[] = await activityLogRepository.findByBoardId(boardId)
        return new CustomSuccessfulResponse(StatusCodes.OK, 'Activity logs retrieved successfully', activityLogs)
    }
    public async saveActivityLog(activityLog: ActivityLog): Promise<CustomSuccessfulResponse> {
        const newActivityLog: ActivityLog = await activityLogRepository.create(activityLog)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, 'Activity log saved successfully')
    }
}

export default new activityLogService()