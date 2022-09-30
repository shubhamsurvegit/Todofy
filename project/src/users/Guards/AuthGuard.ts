
import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common'
import { Observable } from 'rxjs'
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private jwtService:JwtService ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req=context.switchToHttp().getRequest()
        
        try{
            const token=req.headers.authorization.split(" ")[1]
            const {id}=this.jwtService?.verify(token,{secret:"test"})
            if(id){
                req.id=id
                return true
            }
        }
        catch{
            throw new HttpException("TOKEN INVALID",HttpStatus.FORBIDDEN)
        }
    }
}