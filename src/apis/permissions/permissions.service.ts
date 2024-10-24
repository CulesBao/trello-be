import { CustomeSuccessfulResponse } from "../../interface/io.interface";
import { StatusCodes } from "http-status-codes";
import CustomError from "../../utils/CustomError";
import { PermissionSerivce } from "./permission.repository";
import { Permission } from "../../entity/Permission";
class permission {
    private permissionService = new PermissionSerivce()
    async createPermission(permissionInput: Permission): Promise<CustomeSuccessfulResponse> {
        try {
            const { name, description } = permissionInput;
            const permission = await this.permissionService.findByName(name)
            if (permission)
                throw new CustomError(StatusCodes.CONFLICT, "Permission name is already existed")
            await this.permissionService.createPermission(permissionInput)
            return new CustomeSuccessfulResponse(StatusCodes.CREATED, 'Permission created successfully');
        }
        catch (err) {
            throw err;
        }
    }
    async getPermissions(id: string): Promise<CustomeSuccessfulResponse> {
        try {
            if (!id)
                throw new CustomError(StatusCodes.BAD_REQUEST, 'Category id is required');
            if (id == 'all') {
                const permissions = await this.permissionService.findAll()
                return new CustomeSuccessfulResponse(StatusCodes.OK, 'Permissions fetched successfully', permissions);
            }
            else {
                const permisison = await this.permissionService.findById(Number(id))
                if (!permisison)
                    throw new CustomError(StatusCodes.NOT_FOUND, 'Permission not found');
                return new CustomeSuccessfulResponse(StatusCodes.OK, 'Permission fetched successfully', permisison);
            }
        }
        catch (err) {
            throw err;
        }
    }
    async deletePermission(id: string): Promise<CustomeSuccessfulResponse> {
        try {
            if (!id)
                throw new CustomError(StatusCodes.BAD_REQUEST, 'Category id is required');
            const permission = await this.permissionService.findById(Number(id))
            if (permission)
                throw new CustomError(StatusCodes.NOT_FOUND, "Permisison not found")
            await this.permissionService.delete(parseInt(id))
            return new CustomeSuccessfulResponse(StatusCodes.OK, 'Permission deleted successfully');
        }
        catch (err) {
            throw err;
        }
    }
}
export default new permission();