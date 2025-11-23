import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString} from "class-validator";

export class CreateVisitSheetDto {
    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly contract_id: number;

    @ApiProperty({example: 1, description: 'ID специалиста'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly specialist_id: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата прибытия'})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly date_arrival: Date;

    @ApiProperty({example: "2024-01-10", description: 'Дата отъезда'})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly date_departure: Date;

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата создания записи', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsOptional()
    readonly create_row_datetime?: Date;
}

