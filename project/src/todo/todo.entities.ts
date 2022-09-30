import { userInfo } from "os";
import { User } from "src/users/user.entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Todo{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @Column()
    isDone:boolean

    @ManyToOne(()=>User,(user)=>user.todos)
    @JoinColumn()
    user:User
}