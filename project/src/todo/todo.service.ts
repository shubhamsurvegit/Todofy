import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entities';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/todo.dto';
import { Todo } from './todo.entities';

@Injectable()
export class TodoService {

    constructor(@InjectRepository(Todo) private readonly todoRepository:Repository<Todo>,private userService:UsersService){}

    async getAll(id:number):Promise<any>{
        return await this.todoRepository.createQueryBuilder("todo")
        .leftJoin("todo.user", "user")
        .where("user.id=:userId",{userId:id})
        .getMany();
    }


    async createTodo(id:number,todo):Promise<any>{
        const user=await this.userService.findUser(id)
        console.log(user) 
        todo.user=user
        const newtodo=this.todoRepository.create(todo)
        return await this.todoRepository.save(newtodo)
        
    }

    async updateTodo(id:number,todo:CreateTodoDto):Promise<any>{
        const todoToUpdate=await this.todoRepository.findOneBy({id})
        if(!todoToUpdate){
            throw new HttpException("Not Found",HttpStatus.NOT_FOUND)
        }
        await this.todoRepository.update(id,todo)
        return todo
    }

    async deleteTodo(id:number):Promise<any>{
        const todo=await this.todoRepository.findOneBy({id})
        if(!todo){
            throw new HttpException("Not Found",HttpStatus.NOT_FOUND)
        }
        await this.todoRepository.delete(id)   
        return todo           
    }
}
