import { Entity, Column, ManyToMany, OneToMany } from "typeorm"
import { baseEntity } from "../../common/base.entity"
import { Workspace } from "../workspace/Workspace.entity"
import { Board } from "../board/Board.entity"
import { Comment } from "../comment/Comment.entity"

@Entity()
export class User extends baseEntity {
    @Column({ length: 100, nullable: false })
    name!: string

    @Column({ length: 100, unique: true, nullable: false })
    email!: string

    @Column({ length: 100, unique: true, nullable: false })
    username!: string

    @Column({ length: 100, nullable: false })
    password!: string

    @Column({ nullable: true, default: null, length: 10 })
    phoneNumber?: string

    @Column({ type: "date", nullable: true, default: null })
    birthDate?: Date

    @ManyToMany(() => Workspace, workspace => workspace.admins)
    adminWorkspaces!: Workspace[]

    @ManyToMany(() => Workspace, workspace => workspace.users)
    workspaces!: Workspace[]

    // @ManyToMany(() => Role, role => role.users, { onDelete: "CASCADE" })
    // @JoinTable({
    //     name: "user_roles",
    //     joinColumn: { name: "userId", referencedColumnName: "id" },
    //     inverseJoinColumn: { name: "roleId", referencedColumnName: "id" }
    // })
    // roles!: Role[]

    @ManyToMany(() => Board, board => board.users)
    boards!: Board[]

    @OneToMany(() => Board, board => board.admin)
    boardsAdmin!: Board[]

    @OneToMany(() => Comment, comment => comment.user)
    comments!: Comment[]
}
