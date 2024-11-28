import { PermissionDTOForRelation } from "../permissions/permission.dto"
import {Role} from './Role.entity'
export class RoleDto {
    name: string
    description: string | undefined
    createAt: Date
    updateAt: Date
    permissions: PermissionDTOForRelation[]
    constructor(role: Role) {
        this.name = role.name
        this.description = role.description
        this.createAt = role.createAt
        this.updateAt = role.updateAt
        this.permissions = role.permissions
    }
}
export class  RoleDTOForRelation {
    id: number
    name: string
    constructor(role: Role) {
        this.id = role.id
        this.name = role.name
    }
}