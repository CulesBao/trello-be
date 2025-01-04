import userRepository from './user.repository'
import rolesRepository from '../roles/roles.repository';
import assignRoleService from '../assignRole/assignRole.service';
import { User } from './User.entity'
import { Role } from '../roles/Role.entity'
import { AssignRoleDTO } from "./user.dto";
import { UpdateUserDTO, UserDTO } from "./user.dto";
import { BadRequest, Forbidden } from "../../handler/failed.handler";
import { MessageConstant } from "../../common/message.constants";

class userService {
    async get(info: string, id: number): Promise<UserDTO | UserDTO[]> {
        if (info == 'me') {
            const user: User = await userRepository.findById(id)
            return new UserDTO(user)
        }
        if (info == 'all') {
            const users: User[] = await userRepository.findAll()
            return users.map(user => new UserDTO(user))
        }
        else {
            const user: User = await userRepository.findById(id)
            return new UserDTO(user)
        }
    }

    deleteUser = async (id: number): Promise<void> => {
        const user = await userRepository.findById(id)
        if (user.roles[0]?.name == 'admin')
            throw new Forbidden(MessageConstant.Role.REQUIRED_ADMIN)
        await userRepository.delete(id)
    }

    updateUser = async (user: User, updatedInfo: UpdateUserDTO): Promise<UserDTO> => {
        const updatedUser = new User()
        updatedUser.name = updatedInfo.name
        updatedUser.phoneNumber = updatedInfo.phoneNumber
        updatedUser.birthDate = updatedInfo.birthDate

        const updatedUserDTO: UserDTO = new UserDTO(await userRepository.update(user.id, updatedUser))
        return updatedUserDTO
    }

    async assignRole(assignRole: AssignRoleDTO): Promise<void> {
        const isExistedRole = await assignRoleService.findWithoutWorkSpaceAndBoard(assignRole.userId, assignRole.roleId)
        if (isExistedRole)
            throw new BadRequest(MessageConstant.Role.EXISTED_ROLE)
        await assignRoleService.assignRole(assignRole.userId, assignRole.roleId)
    }

    async removeRole(removeRole: AssignRoleDTO): Promise<void> {
        const user = await userRepository.findById(removeRole.userId)
        await rolesRepository.findById(removeRole.roleId)
        user.roles?.forEach((value: Role, index: number) => {
            if (value.id == removeRole.roleId) {
                user.roles?.splice(index, 1)
                userRepository.update(user.id, user)
                return
            }
        })
        throw new BadRequest(MessageConstant.Role.NOT_EXISTED_ROLE)
    }
}

export default new userService()