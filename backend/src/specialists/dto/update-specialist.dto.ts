import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsOptional, IsNumber, IsDateString, IsArray} from "class-validator";

export class UpdateSpecialistDto {
    @ApiProperty({example: 1, description: 'ID контракта', required: false})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsOptional()
    readonly contract_id?: number;

    @ApiProperty({example: "Иванов Иван Иванович", description: 'ФИО специалиста', required: false})
    @IsString({message: 'Поле должно быть строкой'})
    @IsOptional()
    readonly fullname?: string;

    @ApiProperty({example: "Инженер", description: 'Должность специалиста', required: false})
    @IsString({message: 'Поле должно быть строкой'})
    @IsOptional()
    readonly post_specialist?: string;

    @ApiProperty({example: "+7 (999) 123-45-67", description: 'Номер телефона', required: false})
    @IsString({message: 'Поле должно быть строкой'})
    @IsOptional()
    readonly phone_number?: string;

    @ApiProperty({example: 12345, description: 'Номер документа', required: false})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsOptional()
    readonly number_doc?: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата документа', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsOptional()
    readonly date_doc?: Date;

    @ApiProperty({example: "Общестроительные работы", description: 'Типы работ', required: false})
    @IsString({each: true, message: 'Элемент должен быть строкой'})
    @IsOptional()
    readonly type_work?: string;
}


