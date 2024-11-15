import { PermissionDTO } from "./dto/permissions.dto";
import { baseMiddleware } from "../../template/base.middleware";
class permissionValidation extends baseMiddleware{
    public createPermission = this.validateSchema(PermissionDTO)
}
export default new permissionValidation()