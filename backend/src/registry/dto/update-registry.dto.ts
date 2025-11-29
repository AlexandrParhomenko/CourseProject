import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateRegistryDto {
    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly contract_id: number;

    @ApiProperty({example: 1, description: 'ID марки'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly brand_id: number;

    @ApiProperty({example: 1, description: 'Тип'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly type_work: string;

    @ApiProperty({example: 1, description: 'ID типа'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly type_doc_id: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата отзыва', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    readonly date_of_review: Date;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата подписанного документа', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    readonly date_signing_doc: Date;

    @ApiProperty({example: "Путь", description: 'Путь'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly path_to_doc_signed: string;

    @ApiProperty({example: "Путь", description: 'Путь к заметкам'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly path_to_doc_with_note: string;
}

