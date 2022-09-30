
import { Todo } from "src/todo/todo.entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string

    @OneToMany(()=>Todo,(todos)=>todos.user)
    todos:Todo[]
}

