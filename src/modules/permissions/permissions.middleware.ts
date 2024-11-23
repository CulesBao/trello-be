import { PermissionDTO } from "./permissions.schema";
import { baseMiddleware } from "../../middleware/base.middleware";
class permissionValidation extends baseMiddleware {
    public createPermission = this.validateSchema(PermissionDTO)
}
export default new permissionValidation()