import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class LoginUserDto {
    @ApiProperty({example: "IvanovII", description: 'Логин'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly login: string;
    @ApiProperty({example: "123456", description: 'Пароль'})
    @IsString({message: 'Поле должно быть строкой'})
    @Length(4, 16, {message: 'Длина не меньше 4 и не больше 16 символов'})
    readonly hash_password: string;
}