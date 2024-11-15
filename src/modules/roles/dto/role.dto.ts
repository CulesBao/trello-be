import Joi from "joi";
import { joiCustomMessage } from "../../../types/joi";
const customMessage = new joiCustomMessage();
export const RoleDTO = Joi.object({
    name: Joi.string().required().min(3).max(100).messages({
        "string.base": customMessage.string("name"),
        "string.empty": customMessage.required("name"),
        "string.min": customMessage.min("name", 3)
    }),
    descripton: Joi.string().max(100).allow('').messages({
        "string.base": customMessage.string("description")
    })
})

export const AssignDTO = Joi.object({
    roleId: Joi.number().required().messages({
        'any.required': customMessage.required('Role id')
    }),
    permissionId: Joi.number().required().messages({
        'any.required': customMessage.required('Role id')
    })
})

export interface assign {
    roleId: number,
    permissionId: number
}