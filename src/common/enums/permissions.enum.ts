export enum Permissions {
    //User
    CREATE_USER = 'createUser',
    GET_USER = 'getUser',
    UPDATE_USER = 'updateUser',
    DELETE_USER = 'deleteUser',
    ASSIGN_ROLE = 'assignRole',
    REMOVE_ROLE = 'removeRole',

    //Role
    CREATE_ROLE = 'createRole',
    GET_ROLE = 'getRole',
    UPDATE_ROLE = 'updateRole',
    DELETE_ROLE = 'deleteRole',
    ASSIGN_PERMISSION = 'assignPermission',
    REMOVE_PERMISSION = 'removePermission',

    //Permission
    CREATE_PERMISSION = 'createPermission',
    GET_PERMISSION = 'getPermission',
    UPDATE_PERMISSION = 'updatePermission',
    DELETE_PERMISSION = 'deletePermission',

    //Wokrspace
    CREATE_WORKSPACE = 'createWorkspace',
    GET_WORKSPACE = 'getWorkspace',
    UPDATE_WORKSPACE = 'updateWorkspace',   
    DELETE_WORKSPACE = 'deleteWorkspace',
    ADD_USER_TO_WORKSPACE = 'addUserToWorkspace',
    REMOVE_USER_FROM_WORKSPACE = 'removeUserFromWorkspace',
    ADD_MEMBER_AS_ADMIN = 'addMemberAsAdmin',
    REMOVE_ADMIN_FROM_WORKSPACE = 'removeAdminFromWorkspace',

    //Board
    CREATE_BOARD = 'createBoard',
    GET_BOARD = 'getBoard',
    UPDATE_BOARD = 'updateBoard',
    DELETE_BOARD = 'deleteBoard',
    ADD_MEMBER_TO_BOARD = 'addMemberToBoard',
    REMOVE_MEMBER_FROM_BOARD = 'removeMemberFromBoard',
}