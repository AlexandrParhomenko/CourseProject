import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsOptional, IsNumber, IsDateString} from "class-validator";

export class UpdateObjectDto {
    @ApiProperty({example: 1, description: 'ID контракта', required: false})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsOptional()
    readonly contract_id?: number;

    @ApiProperty({example: "001", description: 'Номер объекта', required: false})
    @IsString({message: 'Поле должно быть строкой'})
    @IsOptional()
    readonly number_object?: string;

    @ApiProperty({example: "ОО", description: 'Сокращенное название объекта', required: false})
    @IsString({message: 'Поле должно быть строкой'})
    @IsOptional()
    readonly abbreve_name_object?: string;

    @ApiProperty({example: "Объект строительства", description: 'Полное название объекта', required: false})
    @IsString({message: 'Поле должно быть строкой'})
    @IsOptional()
    readonly full_name_object?: string;
}

