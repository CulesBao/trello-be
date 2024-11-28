import { NextFunction, Request, Response } from 'express';
import permissionService from './permissions.service';
import { Created, NoContent, OK } from '../../handler/success.handler';
import { Permission } from './Permission.entity';

class permission {
    async createPermission(req: Request, res: Response, next: NextFunction) {
        try {
            await permissionService.createPermission(req.body);

            new Created(res, 'Permission created successfully');
        }
        catch (err) {
            next(err)
        }
    }
    async getPermissions(req: Request, res: Response, next: NextFunction) {
        try {
            const permissions: Permission | Permission[] = await permissionService.getPermissions(req.params.id);

            new OK(res, "Permissions retrieved successfully", permissions);
        }
        catch (err) {
            next(err)
        }
    }
    async deletePermission(req: Request, res: Response, next: NextFunction) {
        try {
            await permissionService.deletePermission(Number(req.params.id));

            new NoContent(res, 'Permission deleted successfully');
        }
        catch (err) {
            next(err)
        }
    }
}
export default new permission();