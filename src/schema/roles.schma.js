import Joi from "joi";

export const rolesSchema = Joi.object({
    roleName: Joi.string().trim()
})