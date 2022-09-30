import {IsString} from 'class-validator'

export class CreateRegisterDto{


    @IsString()
    name:string

    @IsString()
    email:string

    @IsString()
    password:string
}