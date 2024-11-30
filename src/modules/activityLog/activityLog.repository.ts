import { StatusCodes } from "http-status-codes";
import { baseRepository } from "../../common/base.repository";
import CustomError from "../../middleware/CustomError";
import { ActivityLog } from "./ActivityLog.entity";
import { Actions } from "../../common/enums/actitvitiesLog.enum";

class activityLog extends baseRepository<ActivityLog> {
    public override async create(entity: ActivityLog): Promise<ActivityLog> {
        return this.repository.save(entity);
    }
    public override async findById(id: number): Promise<ActivityLog> {
        const activityLog = await this.repository.findOne({
            where: { id },
        });
        if (!activityLog)
            throw new CustomError(StatusCodes.NOT_FOUND, "ActivityLog not found");
        return activityLog;
    }
    public async findByBoardId(id: number): Promise<String[]> {
        const activityLogs: ActivityLog[] = await this.repository.find({
            where: {
                board: { id }
            },
            relations: ["user", "board", "list", "card", "comment", "checkList", "affectedUser"]
        })
        const activitiesLogStr: String[] = activityLogs.map((activityLog: ActivityLog) => {
            switch (activityLog.action) {
                case Actions.CREATE_BOARD:
                    return `${activityLog.user.name} created board ${activityLog.board.name} at ${activityLog.createAt}`
                case Actions.CREATE_LIST:
                    return `${activityLog.user.name} created list ${activityLog.list?.name} at ${activityLog.createAt}`
                case Actions.CREATE_CARD:
                    return `${activityLog.user.name} created card ${activityLog.card?.title} in list ${activityLog.list?.name} at ${activityLog.createAt}`
                case Actions.CREATE_COMMENT:
                    return `${activityLog.user.name} commented ${activityLog.comment?.content} on card ${activityLog.card?.title} at ${activityLog.createAt}`
                case Actions.CREATE_CHECKLIST:
                    return `${activityLog.user.name} created checklist ${activityLog.checkList?.content} on card ${activityLog.card?.title} at ${activityLog.createAt}`
                case Actions.CREATE_ATTACHMENT:
                    return `${activityLog.user.name} added attachment to card ${activityLog.card?.title} at ${activityLog.createAt}`
                case Actions.ADD_MEMBER:
                    return `${activityLog.user.name} added ${activityLog.affectedUser?.name} to board at ${activityLog.createAt}`
                case Actions.REMOVE_MEMBER:
                    return `${activityLog.user.name} removed ${activityLog.affectedUser?.name} from board at ${activityLog.createAt}`
                case Actions.ADD_ADMIN:
                    return `${activityLog.user.name} added ${activityLog.affectedUser?.name} as admin at ${activityLog.createAt}`
                case Actions.REMOVE_ADMIN:
                    return `${activityLog.user.name} removed ${activityLog.affectedUser?.name} as admin at ${activityLog.createAt}`
                case Actions.DELETE_ATTACHMENT:
                    return `${activityLog.user.name} deleted attachment from card ${activityLog.card?.title} at ${activityLog.createAt}`
                case Actions.DELETE_CHECKLIST:
                    return `${activityLog.user.name} deleted checklist from card ${activityLog.card?.title} at ${activityLog.createAt}`
                case Actions.DELETE_COMMENT:
                    return `${activityLog.user.name} deleted comment on card ${activityLog.card?.title} at ${activityLog.createAt}`
                case Actions.DELETE_CARD:
                    return `${activityLog.user.name} deleted card from list ${activityLog.list?.name} at ${activityLog.createAt}`
                case Actions.DELETE_LIST:
                    return `${activityLog.user.name} deleted list at ${activityLog.createAt}`
                case Actions.DELETE_BOARD:
                    return `${activityLog.user.name} deleted board ${activityLog.board.name} at ${activityLog.createAt}`
                case Actions.UPDATE_BOARD:
                    return `${activityLog.user.name} updated board ${activityLog.board.name} at ${activityLog.createAt}`
                case Actions.UPDATE_CARD:
                    return `${activityLog.user.name} updated card ${activityLog.card?.title} at ${activityLog.createAt}`
                case Actions.UPDATE_COMMENT:
                    return `${activityLog.user.name} updated comment on card ${activityLog.card?.title} at ${activityLog.createAt}`
                case Actions.UPDATE_CHECKLIST:
                    return `${activityLog.user.name} updated checklist on card ${activityLog.card?.title} at ${activityLog.createAt}`
                default:
                    return ""
            }
        })

        return activitiesLogStr.filter((activityLogStr: String) => activityLogStr !== "")
    }
}
export default new activityLog(ActivityLog);