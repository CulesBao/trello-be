import Joi from "joi";
import { JoiCustomMessage } from "../../common/enums/Joi.enum";

const customMessage = new JoiCustomMessage()
export const WorkspaceSchema = Joi.object({
    name: Joi.string().required().max(100).trim().messages({
        'any.required': customMessage.required('Name'),
        'string.trim': customMessage.trim('Name')
    }),
    description: Joi.string().allow('').max(100),
})
export const UpdateSchema = WorkspaceSchema
export const AddMemberSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': customMessage.email('Email'),
        'any.required': customMessage.required('Email')
    }),
    name: Joi.string().required().max(100).trim().allow('').messages({
        'any.required': customMessage.required('Name'),
        'string.trim': customMessage.trim('Name')
    }),
})
export const UpdateMemberSchema = Joi.object({
    userId: Joi.number().required().messages({
        'any.only': "User Id is invalid"
    })
})