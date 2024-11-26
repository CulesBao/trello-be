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
    }
}