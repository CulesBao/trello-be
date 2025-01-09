import { Request, Response, NextFunction } from 'express';
class notificationMiddleware {
    public setUpRequestHeader() {
        return (_: Request, res: Response, next: NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");
            res.setHeader("Access-Control-Allow-Origin", "*"); 
            res.write(`data: ${JSON.stringify({ message: 'Connected' })}\n\n`);
            next();
        };
    }    
}
export default new notificationMiddleware();