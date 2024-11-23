import { AssignDTO, RoleDTO } from "./role.schema";
import { baseMiddleware } from "../../middleware/base.middleware";
class roleValidation extends baseMiddleware {

    public createRole = this.validateSchema(RoleDTO)

    public assignPermission = this.validateSchema(AssignDTO)
}
export default new roleValidation()