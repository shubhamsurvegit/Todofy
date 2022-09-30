import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoController } from './todo.controller';
import { Todo } from './todo.entities';
import { TodoService } from './todo.service';
import {JwtService} from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Todo]),UsersModule],
  controllers: [TodoController],
  providers:[TodoService,JwtService]
})
export class TodoModule {}
