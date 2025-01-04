export class DetailsError {
    public errorCode: string
    public message: string

    constructor(errorCode: string, message: string) {
        this.errorCode = errorCode;
        this.message = message;
    }
}

export const MessageConstant = {
    WorkSpace: {
        NOT_FOUND: new DetailsError("WOR_001", "Workspace not found"),
    },
    Board: {
        NOT_FOUND: new DetailsError("BOA_001", "Board not found"),
    },
    Role: {
        ADMIN: new DetailsError("ROL_001", "You are not admin to perform this action"),
        MEMBER: new DetailsError("ROL_002", "You are not member to perform this action"),
        INVALID_ROLE: new DetailsError("ROL_003", "Invalid role"),
        EXISTED_ADMIN: new DetailsError("ROL_004", "User is already admin of this entity"),
        EXISTED_MEMBER: new DetailsError("ROL_005", "User is already member of this entity"),
        NOT_FOUND_MEMBER: new DetailsError("ROL_006", "User is not member of this entity"),
        NOT_FOUND_ADMIN: new DetailsError("ROL_007", "User is not admin of this entity"),
        DELETE_ADMIN: new DetailsError("ROL_008", "Cannot delete admin out of entity"),
        REQUIRED_ADMIN: new DetailsError("ROL_009", "Entity must have at least one admin"),
        EXISTED_ROLE: new DetailsError("ROL_010", "Role is already existed"),
        NOT_EXISTED_ROLE: new DetailsError("ROL_011", "Role is not existed"),
    },
    List: {
        NOT_FOUND: new DetailsError("LIS_001", "List not found"),
        EXISTED: new DetailsError("LIS_002", "List is already existed"),
    },
    Card: {
        NOT_FOUND: new DetailsError("CAR_001", "Card not found"),
        EXISTED: new DetailsError("CAR_002", "Card is already existed"),
    },
    CheckList: {
        NOT_FOUND: new DetailsError("CHE_001", "CheckList not found"),
        EXISTED: new DetailsError("CHE_002", "CheckList is already existed"),
    },
    Comment: {
        NOT_FOUND: new DetailsError("COM_001", "Comment not found"),
        EXISTED: new DetailsError("COM_002", "Comment is already existed"),
        FORBIDDEN: new DetailsError("COM_003", "You are not authorized to perform this action"),
    },
    Permission: {
        NOT_FOUND: new DetailsError("PER_001", "Permission not found"),
        EXISTED: new DetailsError("PER_002", "Permission is already existed"),
    },
    Auth: {
        REQUIRED_TOKEN: new DetailsError("AUT_001", "Token is required"),
        INVALID_TOKEN: new DetailsError("AUT_002", "Invalid token"),
        INVALID_PERMISSION: new DetailsError("AUT_003", "User does not have permission to perform this action"),
    },
    User: {
        NOT_FOUND: new DetailsError("USE_001", "User not found"),
        EXISTED: new DetailsError("USE_002", "User is already existed"),
        INVALID_EMAIL: new DetailsError("USE_003", "Invalid email"),
        INVALID_PASSWORD: new DetailsError("USE_004", "Invalid password"),
        INVALID_USERNAME: new DetailsError("USE_005", "Invalid username"),
        INVALID_FULLNAME: new DetailsError("USE_006", "Invalid fullname"),
        INVALID_PHONE: new DetailsError("USE_007", "Invalid phone"),
        INVALID_BIRTHDAY: new DetailsError("USE_008", "Invalid birthday"),
        INVALID: new DetailsError("USE_009", "Wrong username or password"),
    },
    Token: {
        INVALID: new DetailsError("TOK_001", "Invalid token"),
        EXPIRED: new DetailsError("TOK_002", "Token is expired"),
        NOT_FOUND: new DetailsError("TOK_003", "Token not found"),
    },
    Entity: {
        NOT_FOUND: new DetailsError("ENT_001", "Entity not found"),
        EXISTED: new DetailsError("ENT_002", "Entity is already existed"),
    },
    ActivityLog: {
        NOT_FOUND: new DetailsError("ACT_001", "ActivityLog not found")
    },
    Attachment: {
        NOT_FOUND: new DetailsError("ATT_001", "Attachment not found"),
        INVALID_FORMAT: new DetailsError("ATT_002", "File format is not supported"),
        FORBIDDEN: new DetailsError("ATT_003", "You are not authorized to perform this action"),
    }
}