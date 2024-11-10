import { RowDataPacket } from "mysql2";

export interface RoleInput {
    name: string
}
export interface Role extends RowDataPacket {
    id: number,
    name: string
}
export interface assignPermissionToRole {
    roleId: number,
    permissionId: number
}
export interface RolePermission extends RowDataPacket {
    roleId: number,
    permissionId: number
}
