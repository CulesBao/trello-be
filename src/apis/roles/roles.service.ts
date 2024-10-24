import { assignPermissionToRole } from "./roles.interface";
import { CustomeSuccessfulResponse } from "../../interface/io.interface";
import CustomError from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";
import { RoleSerivce } from "./roles.repository";
import { PermissionSerivce } from '../permissions/permission.repository'
import { Role } from "../../entity/Role";
import { Permission } from "../../entity/Permission";
class roles {
    private roleService = new RoleSerivce()
    private permissionService = new PermissionSerivce()
    async createRole(roleInput: Role): Promise<CustomeSuccessfulResponse> {
        try {
            const role = await this.roleService.findByName(roleInput.name)
            if (role)
                throw new CustomError(StatusCodes.CONFLICT, 'Role already existed');
            await this.roleService.createRole(roleInput)
            return new CustomeSuccessfulResponse(StatusCodes.CREATED, 'Role created successfully');
        }
        catch (err) {
            throw err
        }
    }
    async assignPermission(assignPermissionToRole: assignPermissionToRole): Promise<CustomeSuccessfulResponse> {
        try {
            const { roleId, permissionId } = assignPermissionToRole;
            const role = await this.roleService.findById(roleId)
            if (!role)
                throw new CustomError(StatusCodes.NOT_FOUND, 'Role not found');
            const permission = await this.permissionService.findById(permissionId)
            if (!permission)
                throw new CustomError(StatusCodes.NOT_FOUND, 'Permission not found')
            role.permissions?.forEach((value: Permission) => {
                if (value.id == permissionId)
                    throw new CustomError(StatusCodes.BAD_REQUEST, "Role is already has this permission")
            })
            await this.roleService.assignPermission(role, permission)
            return new CustomeSuccessfulResponse(StatusCodes.CREATED, 'Assign permission to role successfully');
        }
        catch (err) {
            throw err
        }
    }
    async getRoles(id: string): Promise<CustomeSuccessfulResponse> {
        try {
            if (id == 'all') {
                const roles = await this.roleService.findAll()
                if (roles?.length == 0)
                    throw new CustomError(StatusCodes.NOT_FOUND, 'Roles not found');
                return new CustomeSuccessfulResponse(StatusCodes.OK, 'Roles found', roles);
            }
            else {
                const role = await this.roleService.findById(Number(id))
                if (!role)
                    throw new CustomError(StatusCodes.NOT_FOUND, 'Role not found');
                return new CustomeSuccessfulResponse(StatusCodes.OK, 'Role found', role);
            }

        }
        catch (err) {
            throw err
        }
    }
    async deleteRole(id: string) {
        try {
            const role = await this.roleService.findById(Number(id))
            if (!role)
                throw new CustomError(StatusCodes.NOT_FOUND, 'Role not found');
            if (role.name == 'admin')
                throw new CustomError(StatusCodes.FORBIDDEN, "Cannot delete role admin")
            await this.roleService.delete(Number(id))
            return new CustomeSuccessfulResponse(StatusCodes.OK, 'Role deleted successfully');
        }
        catch (err) {
            throw err
        }
    }
}

export default new roles();