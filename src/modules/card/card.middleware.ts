import { baseMiddleware } from "../../middleware/base.middleware";
import { AddCardDTO } from "./card.schema";
class cardMiddleware extends baseMiddleware {
    public addCard = this.validateSchema(AddCardDTO)
}
export default new cardMiddleware()