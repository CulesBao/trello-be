import { UpdateDTO, RoleAssignDTO } from "./dto/user.dto";
import { baseMiddleware } from "../../template/base.middleware";
class userMiddleware extends baseMiddleware {
    public update = this.validateSchema(UpdateDTO)

    public assign = this.validateSchema(RoleAssignDTO)

    public remove = this.validateSchema(RoleAssignDTO)
}

export default new userMiddleware()