import { NextFunction, Request, Response } from 'express';
import permissionService from './permissions.service';
import { CustomSuccessfulResponse } from '../../middleware/successResponse.middleware';

class permission {
    async createPermission(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomSuccessfulResponse = await permissionService.createPermission(req.body);
            res.status(response.status).json({
                message: response.message
            });
        }
        catch (err) {
            next(err)
        }
    }
    async getPermissions(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomSuccessfulResponse = await permissionService.getPermissions(req.params.id);
            res.status(response.status).json({
                message: response.message,
                data: response.data
            });
        }
        catch (err) {
            next(err)
        }
    }
    async deletePermission(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomSuccessfulResponse = await permissionService.deletePermission(req.params.id);
            res.status(response.status).json({
                message: response.message
            });
        }
        catch (err) {
            next(err)
        }
    }
}
export default new permission();