import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateUserRoleDto {
    @ApiProperty({example: 1, description: 'ID юзера'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly user_id: number;

    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly contract_id: number;

    @ApiProperty({example: 1, description: 'ID роли'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly role_id: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата начала'})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly date_start: Date;

    @ApiProperty({example: "2024-01-01", description: 'Дата окончания'})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly date_end: Date;

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;
}

