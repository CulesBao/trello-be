import { baseMiddleware } from "../../middleware/base.middleware";
import { AddBoardDTO, AddMemberDTO, UpdateBoardDTO } from "./board.schema";

class boardMiddleware extends baseMiddleware {
    public addBoard = this.validateSchema(AddBoardDTO)
    public updateBoard = this.validateSchema(UpdateBoardDTO)
    public addMember = this.validateSchema(AddMemberDTO)
}

export default new boardMiddleware()