import { AssignDTO, RoleDTO } from "./dto/role.dto";
import { baseMiddleware } from "../../template/base.middleware";
class roleValidation extends baseMiddleware {

    public createRole = this.validateSchema(RoleDTO)

    public assignPermission = this.validateSchema(AssignDTO)
}
export default new roleValidation()