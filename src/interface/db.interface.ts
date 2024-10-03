import { RowDataPacket } from "mysql2";

interface User extends RowDataPacket{
    id: number;
    username: string;
    email: string;
    roleId: number;
    password: string;
}
interface Role extends RowDataPacket{
    id: number;
    roleName: string;
}
export { User, Role }