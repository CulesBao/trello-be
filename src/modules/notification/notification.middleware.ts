import { Request, Response, NextFunction } from 'express';
class notificationMiddleware {
    public setUpRequestHeader() {
        return (req: Request, res: Response, next: NextFunction) => {
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");
            res.setHeader("Access-Control-Allow-Origin", "*"); 
            res.write("data: Connected to notifications stream\n\n");
            next();
        };
    }    
}
export default new notificationMiddleware();