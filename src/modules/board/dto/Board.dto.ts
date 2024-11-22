import Joi from "joi"
import { joiCustomMessage } from "../../../types/joi"

const customMessage = new joiCustomMessage()

export const AddBoardDTO = Joi.object({
    name: Joi.string().required().max(100).trim().messages({
        'any.required': customMessage.required('Name'),
        'string.trim': customMessage.trim('Name')
    }),
    description: Joi.string().allow('').max(100),
    workSpaceId: Joi.number().required().messages({
        'any.required': customMessage.required('WorkSpaceId'),
        'number.base': customMessage.number('WorkSpaceId')
    })
})
export const AddMemberDTO = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': customMessage.email('Email'),
        'any.required': customMessage.required('Email')
    }),
    name: Joi.string().required().max(100).trim().allow('').messages({
        'any.required': customMessage.required('Name'),
        'string.trim': customMessage.trim('Name')
    }),
})