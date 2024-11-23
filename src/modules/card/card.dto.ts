import Joi from "joi";
import { JoiCustomMessage } from "../../common/types/joi";

const customMessage = new JoiCustomMessage();

export const AddCardDTO = Joi.object({
    title: Joi.string().max(100).required().messages({
        'string.base': customMessage.string('Title'),
        'string.empty': customMessage.required('Title'),
        'any.required': customMessage.required('Title')
    }),
    description: Joi.string().max(500).allow(null, '').messages({
        'string.base': customMessage.string('Description'),
        'string.empty': customMessage.required('Description'),
        'any.required': customMessage.required('Description')
    }),
    order: Joi.number().required().messages({
        'number.base': customMessage.number('Order'),
        'any.required': customMessage.required('Order')
    }),
    listId: Joi.number().required().messages({
        'number.base': customMessage.number('Board ID'),
        'any.required': customMessage.required('Board ID')
    })
})