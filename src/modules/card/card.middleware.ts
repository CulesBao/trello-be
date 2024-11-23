import { baseMiddleware } from "../../middleware/base.middleware";
import { AddCardDTO } from "./card.dto";

class cardMiddleware extends baseMiddleware {
    public addCard = this.validateSchema(AddCardDTO)
}