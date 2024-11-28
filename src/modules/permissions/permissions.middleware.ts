import { PermissionSchema } from "./permissions.schema";
import { baseMiddleware } from "../../middleware/base.middleware";
class permissionValidation extends baseMiddleware {
    public createPermission = this.validateSchema(PermissionSchema)
}
export default new permissionValidation()