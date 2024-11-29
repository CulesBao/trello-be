import tokenUtils from '../common/utils/token.uitls';
import { NextFunction, Request, Response } from 'express';
import userRepository from '../modules/user/user.repository';
import { Unauthorized } from '../handler/failed.handler';
import { MessageConstant } from '../common/constants/message.constants';
import assignRoleService from '../modules/assignRole/assignRole.service';
import { AssignRole } from '../modules/assignRole/AssignRole.entity';
import { Role } from '../modules/roles/Role.entity';
import rolesRepository from '../modules/roles/roles.repository';
import { boolean } from 'joi';

class authentication {
    authenticateToken() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const authHeader: string | undefined = req.headers['authorization']
                if (!authHeader)
                    throw new Unauthorized(MessageConstant.Auth.REQUIRED_TOKEN)
                const token: string = authHeader.split(' ')[1]
                if (token == null)
                    throw new Unauthorized(MessageConstant.Auth.REQUIRED_TOKEN)
                const id: number = tokenUtils.verifyToken(token)
                if (!id)
                    throw new Unauthorized(MessageConstant.Auth.INVALID_TOKEN)
                req.id = id
                req.user = await userRepository.findById(id)
                next()
            }
            catch (err) {
                next(err)
            }
        }
    }
    authorizePermission = (requiredPermission: string) => {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                let isMatchPermission = false;
                const id: number = Number(req.id);
                const userRoles: AssignRole[] = await assignRoleService.findRoleByUserId(id);
                for (const data of userRoles) {
                    const fullRole: Role = await rolesRepository.findById(data.role.id);
                    const permissions: string[] = fullRole.permissions.map((permission) => permission.name);

                    if (permissions.includes(requiredPermission)) {
                        isMatchPermission = true;
                        break;
                    }
                }
                if (isMatchPermission) {
                    next();
                } else {
                    throw new Unauthorized(MessageConstant.Auth.INVALID_PERMISSION);
                }
            } catch (err) {
                next(err);
            }
        };
    }
    public authorizePermissionWorkSpace(requiredPermission: string) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const workSpaceId: number = Number(req.params.workSpaceId);
                const userId: number = Number(req.id);

                const userRoles: AssignRole[] = await assignRoleService.findRoleByUserIdAndWorkSpaceId(userId, workSpaceId);
                let isMatchPermission = false;
                for (const data of userRoles) {
                    const fullRole: Role = await rolesRepository.findById(data.role.id);
                    const permissions: string[] = fullRole.permissions.map((permission) => permission.name);
                    if (permissions.includes(requiredPermission)) {
                        isMatchPermission = true;
                        break;
                    }
                }
                if (isMatchPermission) {
                    next();
                } else {
                    throw new Unauthorized(MessageConstant.Auth.INVALID_PERMISSION);
                }
            } catch (err) {
                next(err);
            }
        }
    }
}
export default new authentication()