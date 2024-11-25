import Joi from "joi";
import { JoiCustomMessage } from "../../common/enums/Joi.enum";

const CustomMessage = new JoiCustomMessage()

export const AddAttachment = Joi.object({
    cardId: Joi.number().integer().required().messages({
        'any.required': CustomMessage.required('Card id'),
        'number.base': CustomMessage.number('Card id'),
        'number.integer': CustomMessage.number('Card id'),
    })
})