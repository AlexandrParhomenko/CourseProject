import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString, IsArray, ArrayMinSize} from "class-validator";

export class CreateSpecialistDto {
    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly contract_id: number;

    @ApiProperty({example: "Иванов Иван Иванович", description: 'ФИО специалиста'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly fullname: string;

    @ApiProperty({example: "Инженер", description: 'Должность специалиста'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly post_specialist: string;

    @ApiProperty({example: "+7 (999) 123-45-67", description: 'Номер телефона'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly phone_number: string;

    @ApiProperty({example: 12345, description: 'Номер документа'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly number_doc: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата документа'})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly date_doc: Date;

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата создания записи', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsOptional()
    readonly create_row_datetime?: Date;

    @ApiProperty({example: "Общестроительные работы", description: 'Типы работ'})
    @IsString({each: true, message: 'Элемент должен быть строкой'})
    @IsOptional()
    readonly type_work?: string;
}


