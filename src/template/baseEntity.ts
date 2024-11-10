import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class baseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @CreateDateColumn()
    createAt!: Date

    @UpdateDateColumn()
    updateAt!: Date
    
    @Column({type: "boolean", default: false})
    isDeleted!: boolean
}