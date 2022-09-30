import { Body, Controller, Get, Inject, Injectable, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import {CreateRegisterDto} from './dto/userRegister.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entities';
import { Repository } from 'typeorm';
import { CreateLoginDto } from './dto/userLogin.dto';
import { AuthGuard } from './Guards/AuthGuard';
import { Auth } from './Types/Auth.types';


@Controller('users')
export class UsersController {

    constructor(private readonly userService:UsersService,@InjectRepository(User) private readonly userRepository:Repository<User>){}

    

    @Get()
    @UseGuards(AuthGuard)
    test(@Req() req){
        console.log(req?.id)
        return this.userService.test()
    }

    
    @Post('register')
    async register(@Body() dto:CreateRegisterDto):Promise<Auth>{
        return this.userService.register(dto)
    }

    @Post('login')
    async login(@Body() dto:CreateLoginDto):Promise<Auth>{
        return this.userService.login(dto)
    }

}

