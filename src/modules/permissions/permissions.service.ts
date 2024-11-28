import perissionRepository from "./permission.repository";
import { Permission } from "./Permission.entity";
import { BadRequest } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/constants/message.constants";
class permission {
    async createPermission(permissionInput: Permission): Promise<void> {
        const { name, description } = permissionInput;
        const permisison: Permission | null = await perissionRepository.findByName(name)
        if (permisison)
            throw new BadRequest(MessageConstant.Permission.EXISTED)
        await perissionRepository.create(permissionInput)
    }
    async getPermissions(id: string): Promise<Permission | Permission[]> {
        if (id == 'all'){
            const permissions = await perissionRepository.findAll();
            return permissions;
        }
        else {
            const permission = await perissionRepository.findById(parseInt(id))
            return permission;
        }
    }
    async deletePermission(id: number): Promise<void> {
        try {
            await perissionRepository.findById(id)
            await perissionRepository.delete(id)
        }
        catch (err) {
            throw err;
        }
    }
}
export default new permission();