import Joi from "joi"
import { joiCustomMessage } from "../../../types/joi"

const customMessage = new joiCustomMessage()

export const AddBoardDTO = Joi.object({
    name: Joi.string().required().max(100).trim().messages({
        'any.required': customMessage.required('Name'),
        'string.trim': customMessage.trim('Name')
    }),
    description: Joi.string().allow('').max(100),
})