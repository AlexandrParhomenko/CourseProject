import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString} from "class-validator";

export class CreateObjectDto {
    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly contract_id: number;

    @ApiProperty({example: "001", description: 'Номер объекта'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly number_object: string;

    @ApiProperty({example: "ОО", description: 'Сокращенное название объекта'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly abbreve_name_object: string;

    @ApiProperty({example: "Объект строительства", description: 'Полное название объекта'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly full_name_object: string;

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата создания записи', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsOptional()
    readonly create_row_datetime?: Date;
}

