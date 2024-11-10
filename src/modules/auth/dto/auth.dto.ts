import { IsAlphanumeric, IsDate, IsEmail, IsNumberString, IsStrongPassword, Length } from 'class-validator'
interface UserRolesInput {
    userId: number,
    roleId: number
}

class LoginDTO{
    @Length(6, 50)
    @IsAlphanumeric()
    public username!: string

    @Length(6, 50)
    @IsStrongPassword()
    public password!: string
}

class RegisterDTO extends LoginDTO {
    @Length(6, 70)
    name!: string

    @IsEmail()
    email!: string

    @Length(10,11)
    @IsNumberString()
    phoneNumber?: string

    @IsDate()
    birthDate?: Date
}
export { UserRolesInput, LoginDTO, RegisterDTO }