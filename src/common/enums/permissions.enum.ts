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

    //List
    CREATE_LIST = 'createList',
    GET_LIST = 'getList',
    UPDATE_LIST = 'updateList',
    DELETE_LIST = 'deleteList',

    //Card
    CREATE_CARD = 'createCard',
    GET_CARD = 'getCard',
    UPDATE_CARD = 'updateCard',
    DELETE_CARD = 'deleteCard',
    MOVE_CARD = 'moveCard', 
    ADD_MEMBER_TO_CARD = 'addMemberToCard',
    REMOVE_MEMBER_FROM_CARD = 'removeMemberFromCard',
    ADD_LABEL_TO_CARD = 'addLabelToCard',
    GET_LABEL = 'getLabel',
    REMOVE_LABEL_FROM_CARD = 'removeLabelFromCard',
    ADD_CHECKLIST_TO_CARD = 'addChecklistToCard',
    GET_CHECKLIST = 'getChecklist',
    UPDATE_CHECKLIST = 'updateChecklist',
    REMOVE_CHECKLIST_FROM_CARD = 'removeChecklistFromCard',
    ADD_COMMENT_TO_CARD = 'addCommentToCard',
    GET_COMMENT = 'getComment',
    UPDATE_COMMENT = 'updateComment',
    REMOVE_COMMENT_FROM_CARD = 'removeCommentFromCard',
    ADD_ATTACHMENT_TO_CARD = 'addAttachmentToCard',
    GET_ATTACHMENT = 'getAttachment',
    REMOVE_ATTACHMENT_FROM_CARD = 'removeAttachmentFromCard',
    ADD_DUE_DATE_TO_CARD = 'addDueDateToCard',
    REMOVE_DUE_DATE_FROM_CARD = 'removeDueDateFromCard',
    ADD_DESCRIPTION_TO_CARD = 'addDescriptionToCard',
    REMOVE_DESCRIPTION_FROM_CARD = 'removeDescriptionFromCard',
    ADD_VOTE_TO_CARD = 'addVoteToCard',
    REMOVE_VOTE_FROM_CARD = 'removeVoteFromCard',
    ADD_SUBSCRIBER_TO_CARD = 'addSubscriberToCard',
    REMOVE_SUBSCRIBER_FROM_CARD = 'removeSubscriberFromCard',

    //Notification
    CREATE_NOTIFICATION = 'createNotification',
    GET_NOTIFICATION = 'getNotification',
    UPDATE_NOTIFICATION = 'updateNotification',
    DELETE_NOTIFICATION = 'deleteNotification',

    //Activity
    CREATE_ACTIVITY = 'createActivity',
    GET_ACTIVITY = 'getActivity',
    UPDATE_ACTIVITY = 'updateActivity',
    DELETE_ACTIVITY = 'deleteActivity',
}