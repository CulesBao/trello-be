import { NextFunction, Request, Response } from 'express';
import rolesService from './roles.service';
import { Created, NoContent, OK } from '../../handler/success.handler';
import { Role } from './Role.entity';
import { RoleDto } from './role.dto';

class roles {
    async createRole(req: Request, res: Response, next: NextFunction) {
        try {
            await rolesService.createRole(req.body);
            new Created(res, 'Role created successfully');
        }
        catch (err) {
            next(err)
        }
    }
    async assignPermission(req: Request, res: Response, next: NextFunction) {
        try {
            await rolesService.assignPermission(req.body);
            new Created(res, 'Permission assigned to role successfully');
        }
        catch (err) {
            next(err)
        }
    }
    async getRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const roles : RoleDto | RoleDto[]  = await rolesService.getRoles(req.params.id);
            
            new OK(res, "Roles fetched successfully", roles);
        }
        catch (err) {
            next(err)
        }
    }
    async deleteRole(req: Request, res: Response, next: NextFunction) {
        try {
            await rolesService.deleteRole(req.params.id);
            new NoContent(res);
        }
        catch (err) {
            next(err)
        }
    }
    async removePermission(req: Request, res: Response, next: NextFunction) {
        try {
            await rolesService.removePermission(req.body);
            new OK(res, 'Permission removed from role successfully');
        }
        catch (err) {
            next(err)
        }
    }
}

export default new roles();