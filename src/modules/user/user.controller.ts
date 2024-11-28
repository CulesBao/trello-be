import { NoContent, OK } from "../../handler/success.handler";
import { CustomSuccessfulResponse } from "../../middleware/successResponse.middleware";
import { AssignRoleDTO, UpdateUserDTO, UserDTO } from "./user.dto";
import { User } from "./User.entity";
import userService from './user.service'
import { NextFunction, Request, Response } from "express";

class userController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: number = Number(req.params.id)
            const user: UserDTO | UserDTO[] = await userService.get('id', userId)

            new OK(res, "User found", user)
        }
        catch (err: unknown) {
            next(err)
        }
    }
    async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const user: User = req.user

            new OK(res, "User found", new UserDTO(user))
        }
        catch (err: unknown) {
            next(err)
        }
    }
    async getAll(_: Request, res: Response, next: NextFunction) {
        try {
            const users: UserDTO | UserDTO[] = await userService.get('all', 0)

            new OK(res, "Users found", users)
        }
        catch (err: unknown) {
            next(err)
        }
    }
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: number = Number(req.params.id)
            await userService.deleteUser(userId)

            new NoContent(res, "User deleted")
        }
        catch (err: unknown) {
            next(err)
        }
    }
    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user: User = req.user
            const updatedInfo: UpdateUserDTO = req.body
            const updatedUser: UserDTO = await userService.updateUser(user, updatedInfo)

            new OK(res, "User updated", updatedUser)
        }
        catch (err: unknown) {
            next(err)
        }
    }
    async assignRole(req: Request, res: Response, next: NextFunction) {
        try {
            const assignRole: AssignRoleDTO = req.body
            await userService.assignRole(assignRole)

            new OK(res, "Role assigned")
        }
        catch (err: unknown) {
            next(err)
        }
    }
    async removeRole(req: Request, res: Response, next: NextFunction) {
        try {
            const removeRole: AssignRoleDTO = req.body
            await userService.removeRole(removeRole)

            new NoContent(res, "Role removed")
        }
        catch (err: unknown) {
            next(err)
        }
    }
}

export default new userController()