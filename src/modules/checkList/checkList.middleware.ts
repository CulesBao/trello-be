import { baseMiddleware } from "../../middleware/base.middleware";
import { AddCheckList, UpdateCheckList } from "./checkList.schema";


class checkListMiddleware extends baseMiddleware{
    public AddCheckList = this.validateSchema(AddCheckList)
    public UpdateCheckList = this.validateSchema(UpdateCheckList)
}

export default new checkListMiddleware()