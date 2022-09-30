import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config  from '../orm.config';
import { User } from './users/user.entities';
import { Todo } from './todo/todo.entities';
import { UsersService } from './users/users.service';


@Module({

  imports: [UsersModule, TodoModule,TypeOrmModule.forRoot(config),], 
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}


