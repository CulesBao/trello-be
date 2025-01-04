import { baseMiddleware } from "../../middleware/base.middleware";
import { AddComment, UpdateComment } from "./comment.schema";

class commentMiddleware extends baseMiddleware {
    public addComment = this.validateSchema(AddComment)
    public updateComment = this.validateSchema(UpdateComment)
}

export default new commentMiddleware()