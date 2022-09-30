import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {JwtModule} from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../orm.config';
import { User } from './user.entities';



@Module({
    imports:[
        TypeOrmModule.forFeature([User]), JwtModule.register({secret:"test",signOptions:{expiresIn:'1d'}})
    ],
    controllers:[UsersController],
    providers:[UsersService],
    exports:[UsersService]
})



export class UsersModule {}
