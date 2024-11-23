import Joi from "joi"
import { JoiCustomMessage } from "../../common/types/joi"

const customMessage = new JoiCustomMessage()
const LoginDTO = Joi.object({
    username: Joi.string().trim().alphanum().min(6).max(50).messages({
        'string.base': customMessage.string('Username'),
        'string.trim': customMessage.trim('Username'),
        'string.alphanum': customMessage.alphanum('Username'),
        'string.min': customMessage.min('Username', 6),
        'string.max': customMessage.min('Username', 50),
    }),
    password: Joi.string().trim().min(6).max(50).required().messages(
        {
            'string.base': customMessage.string('Password'),
            'string.trim': customMessage.trim('Password'),
            'string.min': customMessage.min('Password', 6),
            'string.max': customMessage.min('Password', 50),
            'any.required': customMessage.required('Password')
        }
    )
})

const RegisterDTO = Joi.object({
    username: Joi.string().trim().alphanum().min(6).max(50).messages({
        'string.base': customMessage.string('Username'),
        'string.trim': customMessage.trim('Username'),
        'string.alphanum': customMessage.alphanum('Username'),
        'string.min': customMessage.min('Username', 6),
        'string.max': customMessage.min('Username', 50),
    }),
    password: Joi.string().trim().min(6).max(50).required().messages({
        'string.base': customMessage.string('Password'),
        'string.trim': customMessage.trim('Password'),
        'string.min': customMessage.min('Password', 6),
        'string.max': customMessage.min('Password', 50),
        'string.required': customMessage.required('Password')
    }),
    name: Joi.string().trim().min(6).max(70).required().messages({
        'string.base': customMessage.string('Name'),
        'any.required': customMessage.required('Name'),
        'string.trim': customMessage.trim('Name'),
        'string.min': customMessage.min('Name', 6),
        'string.max': customMessage.min('Name', 70),
    }),
    email: Joi.string().email().trim().required().messages({
        'string.base': customMessage.string('Email'),
        'string.trim': customMessage.trim('Email'),
        'string.email': customMessage.email('Email'),
        'any.required': customMessage.required('Email')
    }),
    phoneNumber: Joi.string().trim().min(10).max(11).messages({
        'string.base': customMessage.string('Phone number'),
        'string.trim': customMessage.trim('Phone number'),
        'string.min': customMessage.min('Phone number', 10),
        'string.max': customMessage.min('Phone number', 11),
    }),
    birthDate: Joi.date().messages({
        'date.base': customMessage.date('Birth date')
    })
})
export { LoginDTO, RegisterDTO }