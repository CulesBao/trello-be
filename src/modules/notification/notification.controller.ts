import { NextFunction, Request, Response } from "express";
import { User } from "../user/User.entity";
import { logger } from "../../config/pino.config";
import { ActivityLog } from "../activityLog/ActivityLog.entity";
import { Board } from "../board/Board.entity";
import { NotificationResponseDTO } from "./notification.dto";

class notificationController {
    public stack: { user: User; res: Response }[] = [];

    public async addClient(req: Request, res: Response, next: NextFunction) {
        try {
            this.stack.push({
                user: req.user as User
                , res
            });

            req.on("close", () => {
                this.stack = this.stack.filter((value) => value.res !== res);
                const user: User = req.user as User
                logger.info(`User ${user.id} disconnected`);
            });
        } catch (err) {
            next(err);
        }
    }

    public async sendNotification(newActivityLog: ActivityLog) {
        const board: Board = newActivityLog.board
        const notification: NotificationResponseDTO = new NotificationResponseDTO(newActivityLog)
        board.users.forEach((user) => {
            this.stack.forEach((client) => {
                if (user.id === client.user.id) {
                    client.res.write(`data: ${JSON.stringify(notification)}\n\n`);
                }
            });
        });
    }
}
export default new notificationController()