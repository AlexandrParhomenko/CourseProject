import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";
import {LoginUserDto} from "../users/dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService) {
    }

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto)
        return user && this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByLogin(userDto.login)
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.hash_password, 10)
        const user = await this.userService.createUser({...userDto, hash_password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {login: user.dataValues.login, user_id: user.dataValues.user_id}
        return {
            user_id: user.dataValues.user_id,
            login: user.dataValues.login,
            fullname: user.dataValues.fullname,
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getUserByLogin(userDto.login)
        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.hash_password, user.dataValues.hash_password)
            if (passwordEquals) {
                return user
            } else throw new UnauthorizedException('Неверное имя пользователя и/или пароль')
        } else throw new UnauthorizedException('Неверное имя пользователя и/или пароль')
    }
}
