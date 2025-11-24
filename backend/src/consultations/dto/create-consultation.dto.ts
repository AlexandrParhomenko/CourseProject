import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateConsultationDto {
    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly contract_id: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата консультации'})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly date_cons: Date;

    @ApiProperty({example: "Обсуждение этапов проекта", description: 'Содержание консультации'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly content_cons: string;

    @ApiProperty({example: "Согласован план действий", description: 'Результат консультации'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly result_cons: string;

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата создания записи', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsOptional()
    readonly create_row_datetime?: Date;
}

