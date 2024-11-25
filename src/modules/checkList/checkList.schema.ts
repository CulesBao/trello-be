import Joi from "joi";
import { JoiCustomMessage } from "../../common/enums/Joi.enum";

const CustomMessage = new JoiCustomMessage()

export const AddCheckList = Joi.object({
    content: Joi.string().required().messages({
        'string.base': CustomMessage.string('Content'),
        'string.empty': CustomMessage.empty('Content'),
        'any.required': CustomMessage.required('Content')
    }),
    isDone: Joi.boolean().required().messages({
        'boolean.base': CustomMessage.boolean('Is Done'),
        'boolean.empty': CustomMessage.empty('Is Done'),
        'any.required': CustomMessage.required('Is Done')
    }),
    cardId: Joi.number().required().messages({
        'number.base': CustomMessage.number('Card Id'),
        'number.empty': CustomMessage.empty('Card Id'),
        'any.required': CustomMessage.required('Card Id')
    })
})
export const UpdateCheckList = AddCheckList