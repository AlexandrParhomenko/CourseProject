import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsOptional, IsNumber, IsDateString} from "class-validator";

export class UpdateVisitSheetDto {
    @ApiProperty({example: 1, description: 'ID контракта', required: false})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsOptional()
    readonly contract_id?: number;

    @ApiProperty({example: 1, description: 'ID специалиста', required: false})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsOptional()
    readonly specialist_id?: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата прибытия', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsOptional()
    readonly date_arrival?: Date;

    @ApiProperty({example: "2024-01-10", description: 'Дата отъезда', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsOptional()
    readonly date_departure?: Date;
}

