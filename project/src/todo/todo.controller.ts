import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import {AuthGuard} from '../users/Guards/AuthGuard'
import { CreateTodoDto } from './dto/todo.dto';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {

    constructor(private readonly todoService:TodoService){}

    @Get()
    async test(@Req() req):Promise<any>{   
        return await this.todoService.getAll(req.id)
    }

    @Post()
    async create(@Req() req,@Body() todo:CreateTodoDto):Promise<any>{
        return this.todoService.createTodo(req.id,todo)
    }


    @Put(':id')
    async update(@Body() todo:CreateTodoDto,@Param('id') id:number):Promise<any>{
        return this.todoService.updateTodo(id,todo)
    }

    @Delete(':id')
    async delete(@Param('id') id:number):Promise<any>{
        return this.todoService.deleteTodo(id)
    }

    
 



}
