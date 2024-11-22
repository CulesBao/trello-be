import { StatusCodes } from "http-status-codes";
import { baseRepository } from "../../template/base.repository";
import CustomError from "../../utils/CustomError";
import { Card } from "./entity/Card";

class cardRepositoy extends baseRepository<Card> {
    public override async findById(id: number): Promise<Card> {
        const card: Card | null = await this.repository.findOne({
            where: { id: id },
            relations: ['user']
        })
        if (!card)
            throw new CustomError(StatusCodes.NOT_FOUND, 'Card not found')
        return card
    }
}

export default new cardRepositoy(Card)