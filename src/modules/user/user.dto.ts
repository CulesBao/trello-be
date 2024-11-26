import { User } from "./User.entity"

export interface UserDTO {
    id: number,
    email: string,
    name: string
}

export function UserConstructor(user: User) : UserDTO{
    return {
        id: user.id,
        email: user.email,
        name: user.name
    }
}