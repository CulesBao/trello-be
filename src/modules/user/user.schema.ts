import Joi from "joi"
import { JoiCustomMessage } from "../../common/enums/Joi.enum"

const customMessage = new JoiCustomMessage()
export const UpdateDTO = Joi.object({
    name: Joi.string().trim().min(6).max(70).required().messages({
        'string.base': customMessage.string('Name'),
        'any.required': customMessage.required('Name'),
        'string.trim': customMessage.trim('Name'),
        'string.min': customMessage.min('Name', 6),
        'string.max': customMessage.min('Name', 70),
    }),
    phoneNumber: Joi.string().trim().min(10).max(11).allow('').messages({
        'string.base': customMessage.string('Phone number'),
        'string.trim': customMessage.trim('Phone number'),
        'string.min': customMessage.min('Phone number', 10),
        'string.max': customMessage.min('Phone number', 11),
    }),
    birthDate: Joi.date().allow('').messages({
        'date.base': customMessage.date('Birth date')
    })
})
export const RoleAssignDTO = Joi.object({
    userId: Joi.number().required().messages({
        'any.required': customMessage.required('Role id')
    }),
    roleId: Joi.number().required().messages({
        'any.required': customMessage.required('Role id')
    })
})
