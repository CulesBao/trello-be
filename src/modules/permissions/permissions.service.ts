import { CustomSuccessfulResponse } from "../../template/response.dto";
import { StatusCodes } from "http-status-codes";
import CustomError from "../../utils/CustomError";
import { PermissionSerivce } from "./permission.repository";
import { Permission } from "./entity/Permission";
class permission {
    private permissionService = new PermissionSerivce(Permission)
    async createPermission(permissionInput: Permission): Promise<CustomSuccessfulResponse> {
        const { name, description } = permissionInput;
        const entity = await this.permissionService.customFindByField('name', name)
        if (entity)
            throw new CustomError(StatusCodes.CONFLICT, "Permission is already existed")
        await this.permissionService.create(permissionInput)
        return new CustomSuccessfulResponse(StatusCodes.CREATED, 'Permission created successfully');
    }
    async getPermissions(id: string): Promise<CustomSuccessfulResponse> {
        if (!id)
            throw new CustomError(StatusCodes.BAD_REQUEST, 'Category id is required');
        return new CustomSuccessfulResponse(StatusCodes.OK, 'Permission fetched successfully', id == 'all' ? await this.permissionService.findAll() : await this.permissionService.findByField('id', id));
    }
    async deletePermission(id: string): Promise<CustomSuccessfulResponse> {
        try {
            const permission = await this.permissionService.findByField('id', id)
            await this.permissionService.delete(parseInt(id))
            return new CustomSuccessfulResponse(StatusCodes.OK, 'Permission deleted successfully');
        }
        catch (err) {
            throw err;
        }
    }
}
export default new permission();