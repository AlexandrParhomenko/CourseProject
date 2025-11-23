import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsOptional, IsNumber, IsBoolean, IsDateString} from "class-validator";

export class UpdateContractDto {
    @ApiProperty({example: "123/2024", description: 'Номер контракта', required: false})
    @IsString({message: 'Поле должно быть строкой'})
    @IsOptional()
    readonly number_contract?: string;

    @ApiProperty({example: 1, description: 'ID пользователя, редактирующего запись', required: false})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsOptional()
    readonly last_correct_user_id?: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата последнего редактирования', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsOptional()
    readonly last_correct_datetime?: Date;
}

