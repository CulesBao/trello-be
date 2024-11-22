import { baseMiddleware } from "../../template/base.middleware";
import { AddCardDTO } from "./dto/card.dto";

class cardMiddleware extends baseMiddleware{
    public addCard = this.validateSchema(AddCardDTO)
}