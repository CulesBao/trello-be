import { baseMiddleware } from "../../middleware/base.middleware";
import { AddBoardDTO, AddMemberDTO } from "./board.schema";

class boardMiddleware extends baseMiddleware {
    public addBoard = this.validateSchema(AddBoardDTO)
    public addMember = this.validateSchema(AddMemberDTO)
}

export default new boardMiddleware()