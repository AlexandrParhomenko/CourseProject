import {ApiProperty} from "@nestjs/swagger";
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsDateString,
    IsArray,
    ArrayMinSize,
    IsBoolean
} from "class-validator";

export class CreateMainJournalDto {
    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly contract_id: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата'})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly date_supervision: Date;

    @ApiProperty({example: 1, description: 'ID бренда'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly brand_id: number;

    @ApiProperty({example: "Отклонения", description: 'Отклонения'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly defects: string;

    @ApiProperty({example: "Инструкции", description: 'Инструкции'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly instructions: string;

    @ApiProperty({example: 1, description: 'ID нарушения'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    readonly importance_defect_id: number;

    @ApiProperty({example: 1, description: 'ID листа'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    readonly visit_sheet_id: number;

    @ApiProperty({example: "Инструкции", description: 'Инструкции'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly deadline_eliminate: string;

    @ApiProperty({example: 1, description: 'ID листа'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    readonly organization_id: number;

    @ApiProperty({example: false, description: 'Устранено'})
    @IsBoolean({message: 'Поле должно быть boolean'})
    readonly elimination: boolean;

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;
}


