import Joi from "joi";

export const usersSchema = Joi.object({
    name: Joi.string().min(3).trim(),
    email: Joi.string().email(),
    username: Joi.string().min(6).alphanum().trim(),
    password: Joi.string().min(6).trim(),
    roleName: Joi.string().trim()
})