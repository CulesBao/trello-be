import Joi from "joi";
import { JoiCustomMessage } from "../../common/types/joi";

const CustomMessage = new JoiCustomMessage()

export const AddAttachment = Joi.object({
    cardId: Joi.number().integer().required().messages({
        'any.required': CustomMessage.required('Card id'),
        'number.base': CustomMessage.number('Card id'),
        'number.integer': CustomMessage.number('Card id'),
    })
})