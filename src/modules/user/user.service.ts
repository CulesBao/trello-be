import { UserService } from './user.repository'
import { RoleSerivce } from '../roles/roles.repository'
import { User } from './User.entity'
import { Role } from '../roles/Role.entity'
import { AssignRoleDTO } from "./user.dto";
import { UpdateUserDTO, UserDTO } from "./user.dto";
import { BadRequest, Forbidden } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/constants/message.constants";

class userService {
    private userService = new UserService(User)
    private roleService = new RoleSerivce(Role)
    async get(info: string, id: number): Promise<UserDTO | UserDTO[]> {
        if (info == 'me') {
            const user: User = await this.userService.findById(id)
            return new UserDTO(user)
        }
        if (info == 'all') {
            const users: User[] = await this.userService.findAll()
            return users.map(user => new UserDTO(user))
        }
        else {
            const user: User = await this.userService.findById(id)
            return new UserDTO(user)
        }
    }

    deleteUser = async (id: number): Promise<void> => {
        const user = await this.userService.findById(id)
        if (user.roles[0]?.name == 'admin')
            throw new Forbidden(MessageConstant.Role.REQUIRED_ADMIN)
        await this.userService.delete(id)
    }

    updateUser = async (user: User, updatedInfo: UpdateUserDTO): Promise<UserDTO> => {
        const updatedUser = new User()
        updatedUser.name = updatedInfo.name
        updatedUser.phoneNumber = updatedInfo.phoneNumber
        updatedUser.birthDate = updatedInfo.birthDate

        const updatedUserDTO: UserDTO = new UserDTO(await this.userService.update(user.id, updatedUser))
        return updatedUserDTO
    }

    async assignRole(assignRole: AssignRoleDTO): Promise<void> {
        const user = await this.userService.findById(assignRole.userId)
        const role = await this.roleService.findById(assignRole.roleId)
        user.roles?.forEach((value: Role) => {
            if (value.id == assignRole.roleId)
                throw new BadRequest(MessageConstant.Role.EXISTED_ROLE)
        })
        await this.userService.assignRole(user, role)
    }

    async removeRole(removeRole: AssignRoleDTO): Promise<void> {
        const user = await this.userService.findById(removeRole.userId)
        await this.roleService.findById(removeRole.roleId)
        user.roles?.forEach((value: Role, index: number) => {
            if (value.id == removeRole.roleId) {
                user.roles?.splice(index, 1)
                this.userService.update(user.id, user)
                return
            }
        })
        throw new BadRequest(MessageConstant.Role.NOT_EXISTED_ROLE)
    }
}

export default new userService()