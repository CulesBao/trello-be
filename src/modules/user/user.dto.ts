import { User } from "./User.entity"

export class UserDTOForWorkspace {
    id: number
    name: string
    email: string
    constructor(user: User) {
        this.id = user.id
        this.name = user.name
        this.email = user.email
    }
}
export class UserDTOForAll {
    id: number
    name: string
    constructor(user: User) {
        this.id = user.id
        this.name = user.name
    }
}
export interface AssignRoleDTO {
    userId: number,
    roleId: number
}
export class UserDTO {
    id: number
    email: string
    name: string
    createAt: Date
    updateAt: Date
    constructor(user: User) {
        this.id = user.id
        this.email = user.email
        this.name = user.name
        this.createAt = user.createAt
        this.updateAt = user.updateAt
    }
}
export class UpdateUserDTO {
    name: string
    password: string
    phoneNumber: string
    birthDate: Date
    constructor(name: string, password: string, phoneNumber: string, birthDate: Date) {
        this.name = name
        this.password = password
        this.phoneNumber = phoneNumber
        this.birthDate = birthDate
    }
}