import Joi from "joi";
import { joiCustomMessage } from "../../../types/joi";
const customMessage = new joiCustomMessage()

export const createListDTO = Joi.object({
    name: Joi.string().required().max(100).trim().messages({
        'any.required': customMessage.required('Name'),
        'string.trim': customMessage.trim('Name')
    }),
    order: Joi.number().required().messages({
        'any.required': customMessage.required('Order'),
        'number.base': customMessage.number('Order')
    }),
    boardId: Joi.number().required().messages({
        'any.required': customMessage.required('Board ID'),
        'number.base': customMessage.number('Board ID')
    })
})