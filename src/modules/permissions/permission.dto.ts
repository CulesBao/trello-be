import { Permission } from "./Permission.entity"

export class PermissionDTOForRelation {
    id: number
    name: string
    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }
}
export class PermissionDTO {
    id: number
    name: string
    createAt: Date
    updateAt: Date
    constructor(permission: Permission) {
        this.id = permission.id
        this.name = permission.name
        this.createAt = permission.createAt
        this.updateAt = permission.updateAt
    }
}