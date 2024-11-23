import Joi from "joi";
import { JoiCustomMessage } from "../../common/types/joi";

const customMessage = new JoiCustomMessage()
export const WorkspaceDTO = Joi.object({
    name: Joi.string().required().max(100).trim().messages({
        'any.required': customMessage.required('Name'),
        'string.trim': customMessage.trim('Name')
    }),
    description: Joi.string().allow('').max(100),
})
export const UpdateDTO = WorkspaceDTO
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
export const UpdateMemberDTO = Joi.object({
    userId: Joi.number().required().messages({
        'any.only': "User Id is invalid"
    })
})