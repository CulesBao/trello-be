import tokenUtils from '../common/utils/token.uitls';
import { NextFunction, Request, Response } from 'express';
import userRepository from '../modules/user/user.repository';
import { Unauthorized } from '../handler/failed.handler';
import { MessageConstant } from '../common/message.constants';
import assignRoleService from '../modules/assignRole/assignRole.service';
import { AssignRole } from '../modules/assignRole/AssignRole.entity';
import { Role } from '../modules/roles/Role.entity';
import rolesRepository from '../modules/roles/roles.repository';
import { Card } from '../modules/card/Card.entity';
import cardRepository from '../modules/card/card.repository';
import workspaceRepository from '../modules/workspace/workspace.repository';
import boardRepository from '../modules/board/board.repository';
import listRepository from '../modules/list/list.repository';
import { List } from '../modules/list/List.entity';
import cloudinary from '../config/cloudinary.config';
class authentication {
    public authenticateToken() {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                if (req.query.token) {
                    const token = req.query.token as string
                    const id: number = tokenUtils.verifyToken(token)
                    if (!id)
                        throw new Unauthorized(MessageConstant.Auth.INVALID_TOKEN)
                    req.id = id
                    req.user = await userRepository.findById(id)
                    return next()
                }
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
    private async authorizePermissionByBoardId(requiredPermission: string, boardId: number, userId: number): Promise<void> {
        const userRoles: AssignRole[] = await assignRoleService.findRoleByUserIdAndBoardId(userId, boardId);
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
            return
        } else {
            throw new Unauthorized(MessageConstant.Auth.INVALID_PERMISSION);
        }
    }
    public authorizePermission = (requiredPermission: string) => {
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
                const workSpaceId: number = Number(req.params.workSpaceId) || Number(req.body.workspaceId);
                await workspaceRepository.findById(workSpaceId);
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
    public authorizePermissionList(requiredPermission: string) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const listId: number = Number(req.params.id) || Number(req.body.listId);
                const list = await listRepository.findById(listId);
                const boardId: number = list.board.id;
                const userId: number = Number(req.id);
                await this.authorizePermissionByBoardId(requiredPermission, boardId, userId);
                next();
            } catch (err) {
                next(err);
            }
        }
    }
    public authorizePermissionCard(requiredPermission: string) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const cardId: number = Number(req.params.id) || Number(req.body.cardId)
                const card: Card = await cardRepository.findById(cardId);
                req.card = card;
                const list: List = await listRepository.findById(card.list.id);
                const boardId: number = list.board.id;
                const userId: number = Number(req.id);
                await this.authorizePermissionByBoardId(requiredPermission, boardId, userId);
                next();
            } catch (err) {
                next(err);
            }
        }
    }
    public authorizePermissionCardAndFile(requiredPermission: string) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const cardId: number = Number(req.params.id) || Number(req.body.cardId)
                const card: Card = await cardRepository.findById(cardId);
                req.card = card;
                const list: List = await listRepository.findById(card.list.id);
                const boardId: number = list.board.id;
                const userId: number = Number(req.id);
                await this.authorizePermissionByBoardId(requiredPermission, boardId, userId);
                next();
            } catch (err) {
                const publicId = req.file?.path
                    .split('/').slice(-2).join('/').split('.')[0];
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }
                next(err);
            }
        }
    }
    public authorizePermissionBoard(requiredPermission: string) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const boardId: number = Number(req.params.boardId) || Number(req.body.boardId);
                await boardRepository.findById(boardId);
                const userId: number = Number(req.id);
                await this.authorizePermissionByBoardId(requiredPermission, boardId, userId);
                next();
            } catch (err) {
                next(err);
            }
        }
    }
    public authorizePermissionChildCard(requiredPermission: string, target: string) {
        return async (req: Request, _: Response, next: NextFunction) => {
            try {
                const targetId: number = Number(req.params.commentId) || Number(req.params.checkListId) || Number(req.params.attachmentId);

                next();
            } catch (err) {
                next(err);
            }
        }
    }
}
export default new authentication()