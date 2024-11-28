import roleRepository from "./roles.repository";
import permissionRepository from '../permissions/permission.repository'
import { Role } from "./Role.entity";
import { Permission } from "../permissions/Permission.entity";
import { assign } from "./role.schema";
import { BadRequest, Forbidden } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/constants/message.constants";
import { RoleDto } from "./role.dto";

class roleService {
    async createRole(roleInput: Role): Promise<void> {
        const role: Role | null = await roleRepository.findForCreate(roleInput.name)
        if (role)
            throw new BadRequest(MessageConstant.Role.EXISTED_ROLE)
        await roleRepository.create(roleInput)
    }
    async assignPermission(assignPermissionToRole: assign): Promise<void> {
        const { roleId, permissionId } = assignPermissionToRole;
        const role = await roleRepository.findById(roleId)
        const permission = await permissionRepository.findByField('id', permissionId)
        role.permissions?.forEach((value: Permission) => {
            if (value.id == permissionId)
                throw new BadRequest(MessageConstant.Permission.EXISTED)
        })
        await roleRepository.assignPermission(role, permission)
    }
    async getRoles(id: string): Promise<RoleDto | RoleDto[]> {
        if (id == 'all') {
            const roles = await roleRepository.findAll()
            return roles.map((role: Role) => new RoleDto(role))
        }
        else {
            const role = await roleRepository.findById(Number(id))
            return new RoleDto(role)
        }
    }
    async deleteRole(id: string): Promise<void> {
        const role = await roleRepository.findById(Number(id))
        if (role.name == 'admin')
            throw new Forbidden(MessageConstant.Role.REQUIRED_ADMIN)
        await roleRepository.delete(Number(id))
    }
    async removePermission(assignPermissionToRole: assign): Promise<Role> {
        const { roleId, permissionId } = assignPermissionToRole;
        const role = await roleRepository.findById(roleId)
        await permissionRepository.findByField('id', permissionId)
        role.permissions?.forEach((value: Permission) => {
            if (value.id == permissionId) {
                role.permissions?.splice(role.permissions.indexOf(value), 1)
            }
        })
        const updatedRole: Role = await roleRepository.update(roleId, role)
        return updatedRole
    }
}

export default new roleService();