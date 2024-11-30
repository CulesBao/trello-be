import { baseMiddleware } from "../../middleware/base.middleware";
import { createListDTO, updateListDTO } from "./list.schema";
class listMiddleware extends baseMiddleware {
    public createList = this.validateSchema(createListDTO)
    public updateList = this.validateSchema(updateListDTO)
}
export default new listMiddleware()