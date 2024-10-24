import bcrypt, {genSalt} from 'bcrypt'

const hashPassword = async(password: string): Promise<string> => {
    const saltRound = 10
    return await bcrypt.hash(password, saltRound)
}

const comparePassword = async(password: string, hashPassword: string) : Promise<boolean>=> {
    return await bcrypt.compare(password, hashPassword)
}

export default {hashPassword, comparePassword}