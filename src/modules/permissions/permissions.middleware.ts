import { PermissionDTO } from "./permissions.dto";
import { baseMiddleware } from "../../middleware/base.middleware";
class permissionValidation extends baseMiddleware {
    public createPermission = this.validateSchema(PermissionDTO)
}
export default new permissionValidation()