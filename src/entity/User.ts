import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Role } from "./Role"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number
    @Column({ length: 100 })
    name!: string
    @Column({ length: 100, unique: true })
    email!: string
    @Column({ length: 100, unique: true })
    username!: string
    @Column({ length: 100 })
    password!: string

    @ManyToMany(() => Role, role => role.users)
    @JoinTable()
    roles!: Role[]
}
