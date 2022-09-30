import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UsingJoinTableIsNotAllowedError } from 'typeorm';
import { User } from './user.entities';
import { CreateLoginDto } from './dto/userLogin.dto';
import { CreateRegisterDto } from './dto/userRegister.dto';
import * as bcrypt from 'bcrypt'
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class UsersService {


    constructor(@InjectRepository(User)  private readonly userRepository:Repository<User> ,private jwtService:JwtService){}

    async test(){
        return this.userRepository.find()
    }
    
    async register(dto:CreateRegisterDto):Promise<any>{
        const {email}=dto
        const user=await this.userRepository.findOneBy({email})
        if(user){
            throw new HttpException("user exists",HttpStatus.FORBIDDEN)
        }

        const hash=await bcrypt.hash(dto.password, 10);
        dto.password=hash
        
        let newUser=this.userRepository.create(dto)
        const {password,...data}=await this.userRepository.save(newUser)
        const token=await this.jwtService.signAsync({id:newUser.id})
        return {data,token}
    }

    async login(dto:CreateLoginDto):Promise<any>{
        const {email}=dto
        const user=await this.userRepository.findOneBy({email})
        if(!user){
            throw new HttpException("Invalid credentials",HttpStatus.FORBIDDEN)
        }
        if(!await bcrypt.compare(dto.password, user.password)){
            throw new HttpException("Invalid credentials",HttpStatus.FORBIDDEN)
        }

        const {password,...data}=user
        const token=await this.jwtService.signAsync({id:user.id})
        return {data,token:token}
    }

    async findUser(id){
        const {password,...user}= await this.userRepository.findOneBy({id})
        return user
    }
}
