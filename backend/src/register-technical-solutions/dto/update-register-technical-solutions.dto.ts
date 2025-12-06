import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsOptional, IsNumber, IsDateString, IsArray, IsNotEmpty, IsBoolean} from "class-validator";

export class UpdateRegisterTechnicalSolutionsDto {
    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly contract_id: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата'})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly date_solution: Date;

    @ApiProperty({example: 1, description: 'ID журнала'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly main_journal_id: number;

    @ApiProperty({example: "Отклонения", description: 'Отклонения'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly full_brand_code: string;

    @ApiProperty({example: "Инструкции", description: 'Инструкции'})
    @IsOptional()
    @IsString({message: 'Поле должно быть строкой'})
    readonly reason_change: string | null;

    @ApiProperty({example: "Инструкции", description: 'Инструкции'})
    @IsOptional()
    @IsString({message: 'Поле должно быть строкой'})
    readonly path_photo_sol: string | null;

    @ApiProperty({example: "Инструкции", description: 'Инструкции'})
    @IsOptional()
    @IsString({message: 'Поле должно быть строкой'})
    readonly status_compliance: string | null;

    @ApiProperty({example: "Инструкции", description: 'Инструкции'})
    @IsOptional()
    @IsString({message: 'Поле должно быть строкой'})
    readonly note: string | null;
}


