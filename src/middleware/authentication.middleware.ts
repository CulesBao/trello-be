import { StatusCodes } from 'http-status-codes';
import tokenUtils from '../common/utils/token.uitls';
import rolesService from '../service/roles.service';
import { NextFunction, Request, Response } from 'express';
import CustomError from './CustomError';
import { UserService } from '../modules/user/user.repository';
import { User } from '../modules/user/User.entity';

class authentication {
    private userService: UserService = new UserService(User)
    authenticateToken() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const authHeader: string | undefined = req.headers['authorization']
                if (!authHeader)
                    throw new CustomError(StatusCodes.UNAUTHORIZED, "Cannot found token")
                const token: string = authHeader.split(' ')[1]
                if (token == null)
                    throw new CustomError(StatusCodes.UNAUTHORIZED, 'Unauthorized')
                const id: number = tokenUtils.verifyToken(token)
                if (!id)
                    throw new CustomError(StatusCodes.UNAUTHORIZED, 'Unauthorized')
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
                if (!id) {
                    throw new CustomError(StatusCodes.UNAUTHORIZED, 'Unauthorized');
                }
                const rolesName: string[] = await rolesService.userRoles(id);
                if (!rolesName.includes(requiredRole)) {
                    throw new CustomError(StatusCodes.FORBIDDEN, 'Forbidden');
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
                if (!id) {
                    throw new CustomError(StatusCodes.UNAUTHORIZED, 'Unauthorized');
                }
                const permissions: string[] = await rolesService.userPermissions(id);

                if (!permissions.includes(requiredPermission)) {
                    throw new CustomError(StatusCodes.FORBIDDEN, 'Cannot access this resource');
                }
                next();
            } catch (err) {
                next(err);
            }
        };
    }
}
export default new authentication()