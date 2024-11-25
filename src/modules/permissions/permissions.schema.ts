import Joi from "joi";
import { JoiCustomMessage } from "../../common/enums/Joi.enum";

const customMessage = new JoiCustomMessage()
export const PermissionDTO = Joi.object({
    name: Joi.string().min(5).max(100).required().messages({
        'string.min': customMessage.min("Name", 5),
        'any.required': customMessage.required('Name')
    }),
    description: Joi.string().min(5).max(100).allow('').messages({
        'string.min': customMessage.min("Name", 5),
    }),
})