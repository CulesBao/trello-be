import { NextFunction, Request, Response } from 'express';
import { CustomeSuccessfulResponse } from '../../interface/io.interface';
import rolesService from './roles.service';

class roles {
    async createRole(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomeSuccessfulResponse = await rolesService.createRole(req.body);
            res.status(response.status).json({
                message: response.message
            });
        }
        catch (err) {
            next(err)
        }
    }
    async assignPermission(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomeSuccessfulResponse = await rolesService.assignPermission(req.body);
            res.status(response.status).json({
                message: response.message
            });
        }
        catch (err) {
            next(err)
        }
    }
    async getRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomeSuccessfulResponse = await rolesService.getRoles(req.params.id);
            res.status(response.status).json({
                message: response.message,
                data: response.data
            });
        }
        catch (err) {
            next(err)
        }
    }
    async deleteRole(req: Request, res: Response, next: NextFunction) {
        try {
            const response: CustomeSuccessfulResponse = await rolesService.deleteRole(req.params.id);
            res.status(response.status).json({
                message: response.message
            });
        }
        catch (err) {
            next(err)
        }
    }
}

export default new roles();