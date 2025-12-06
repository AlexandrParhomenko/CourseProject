import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsOptional, IsNumber, IsDateString, IsNotEmpty} from "class-validator";

export class UpdateVisitSheetOcpDto {
    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly visit_sheet_id: number;

    @ApiProperty({example: 1, description: 'ID специалиста'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly organization_contact_person_id: number;
}

