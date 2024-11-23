import Joi from "joi";
import { JoiCustomMessage } from "../../common/types/joi";

const CustomMessage = new JoiCustomMessage()

export const AddComment = Joi.object({
    content: Joi.string().max(500).required().messages({
        "string.base": CustomMessage.string("Content"),
        "string.empty": CustomMessage.empty("Content"),
        "string.max": CustomMessage.max(500),
        "any.required": CustomMessage.required("Content")
    }),
    cardId: Joi.number().required().messages({
        "number.base": CustomMessage.number("Card Id"),
        "any.required": CustomMessage.required("Card Id")
    })
})
export const UpdateComment = AddComment