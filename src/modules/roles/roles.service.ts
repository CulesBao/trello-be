import { CustomSuccessfulResponse } from "../../template/response.dto";
import CustomError from "../../utils/CustomError";
import { StatusCodes } from "http-status-codes";
import { RoleSerivce } from "./roles.repository";
import { PermissionSerivce } from '../permissions/permission.repository'
import { Role } from "./entity/Role";
import { Permission } from "../permissions/entity/Permission";
import { assign } from "./dto/role.dto";
class roles {
    private roleService = new RoleSerivce(Role)
    private permissionService = new PermissionSerivce(Permission)
    async createRole(roleInput: Role): Promise<CustomSuccessfulResponse> {
        const role = await this.roleService.findByName(roleInput.name)
        if (role)
            throw new CustomError(StatusCodes.CONFLICT, 'Role already existed');
        await this.roleService.create(roleInput)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, 'Role created successfully');
    }
    async assignPermission(assignPermissionToRole: assign): Promise<CustomSuccessfulResponse> {
        const { roleId, permissionId } = assignPermissionToRole;
        const role = await this.roleService.findById(roleId)
        const permission = await this.permissionService.findByField('id', permissionId)
        role.permissions?.forEach((value: Permission) => {
            if (value.id == permissionId)
                throw new CustomError(StatusCodes.BAD_REQUEST, "Role is already has this permission")
        })
        await this.roleService.assignPermission(role, permission)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, 'Assign permission to role successfully');
    }
    async getRoles(id: string): Promise<CustomSuccessfulResponse> {
        if (id == 'all') {
            const roles = await this.roleService.findAll()
            return new CustomSuccessfulResponse(StatusCodes.OK, 'Roles found', roles);
        }
        else {
            const role = await this.roleService.findById(Number(id))
            return new CustomSuccessfulResponse(StatusCodes.OK, 'Role found', role);
        }
    }
    async deleteRole(id: string) {
        const role = await this.roleService.findById(Number(id))
        if (role.name == 'admin')
            throw new CustomError(StatusCodes.FORBIDDEN, "Cannot delete role admin")
        await this.roleService.delete(Number(id))
        return new CustomSuccessfulResponse(StatusCodes.OK, 'Role deleted successfully');
    }
    async removePermission(assignPermissionToRole: assign): Promise<CustomSuccessfulResponse> {
        const { roleId, permissionId } = assignPermissionToRole;
        const role = await this.roleService.findById(roleId)
        await this.permissionService.findByField('id', permissionId)
        role.permissions?.forEach((value: Permission) => {
            if (value.id == permissionId) {
                role.permissions?.splice(role.permissions.indexOf(value), 1)
            }
        })
        await this.roleService.create(role)
        return new CustomSuccessfulResponse(StatusCodes.OK, 'Remove permission from role successfully');
    }
}

export default new roles();