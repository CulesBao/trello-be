import { UpdateDTO, RoleAssignDTO } from "./user.dto";
import { baseMiddleware } from "../../middleware/base.middleware";
class userMiddleware extends baseMiddleware {
    public update = this.validateSchema(UpdateDTO)

    public assign = this.validateSchema(RoleAssignDTO)

    public remove = this.validateSchema(RoleAssignDTO)
}

export default new userMiddleware()