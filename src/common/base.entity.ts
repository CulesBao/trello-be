import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class baseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @CreateDateColumn({type: "timestamp"})
    createAt!: Date

    @UpdateDateColumn({type: "timestamp"})
    updateAt!: Date

    @Column({ type: "boolean", default: false })
    isDeleted!: boolean

    [key: string]: any
}