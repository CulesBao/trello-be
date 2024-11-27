import tokenUtils from '../common/utils/token.uitls';
import rolesService from '../service/roles.service';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../modules/user/user.repository';
import { User } from '../modules/user/User.entity';
import { Forbidden, Unauthorized } from '../handler/failed.handler';
import { MessageConstant } from '../common/constants/message.constants';

class authentication {
    private userService: UserService = new UserService(User)
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
                req.user = await this.userService.findById(id)
                next()
            }
            catch (err) {
                next(err)
            }
        }
    }
    authorizeRole = (requiredRole: string) => {
        return async (req: any, _: any, next: any) => {
            try {
                const id: number = req.id;
                const rolesName: string[] = await rolesService.userRoles(id);

                if (!rolesName.includes(requiredRole)) {
                    throw new Forbidden(MessageConstant.Role.INVALID_ROLE)
                }
                next();
            } catch (err) {
                next(err);
            }
        };
    }
    authorizePermission = (requiredPermission: string) => {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const id: number = Number(req.id);
                const permissions: string[] = await rolesService.userPermissions(id);

                if (!permissions.includes(requiredPermission)) {
                    throw new Forbidden(MessageConstant.Permission.NOT_FOUND)
                }
                next();
            } catch (err) {
                next(err);
            }
        };
    }
}
export default new authentication()