export enum Permissions {
    //User
    CREATE_USER = 'createUser',
    GET_USER = 'getUser',
    UPDATE_USER = 'updateUser',
    DELETE_USER = 'deleteUser',
    ASSIGN_ROLE = 'assignRole',

    //Role
    CREATE_ROLE = 'createRole',
    GET_ROLE = 'getRole',
    UPDATE_ROLE = 'updateRole',
    DELETE_ROLE = 'deleteRole',
    ASSIGN_PERMISSION = 'assignPermission',

    //Permission
    CREATE_PERMISSION = 'createPermission',
    GET_PERMISSION = 'getPermission',
    UPDATE_PERMISSION = 'updatePermission',
    DELETE_PERMISSION = 'deletePermission',
}