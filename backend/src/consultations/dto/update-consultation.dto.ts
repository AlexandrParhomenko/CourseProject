import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsOptional, IsString} from "class-validator";

export class UpdateConsultationDto {
    @ApiProperty({example: "2024-01-01", description: 'Дата консультации', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsOptional()
    readonly date_cons?: Date;

    @ApiProperty({example: "Обсуждение этапов проекта", description: 'Содержание консультации', required: false})
    @IsString({message: 'Поле должно быть строкой'})
    @IsOptional()
    readonly content_cons?: string;

    @ApiProperty({example: "Согласован план действий", description: 'Результат консультации', required: false})
    @IsString({message: 'Поле должно быть строкой'})
    @IsOptional()
    readonly result_cons?: string;
}

