import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {IsNull} from "sequelize-typescript";

export class UpdateBrandDto {
    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly contract_id: number;

    @ApiProperty({example: 1, description: 'ID объекта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly object_id: number;

    @ApiProperty({example: 1, description: 'Название'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly title: number;

    @ApiProperty({example: 1, description: 'ID дисциплины'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly discipline_id: number;

    @ApiProperty({example: 1, description: 'Сокр марка'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly abbreve_brand_id: number;

    @ApiProperty({example: 'Секции', description: 'Секции'})
    @IsOptional()
    @IsString({message: 'Поле должно быть строкой'})
    readonly sections: string | null;

    @ApiProperty({example: 'Подсекции', description: 'Подсекции'})
    @IsOptional()
    @IsString({message: 'Поле должно быть строкой'})
    readonly subsection: string | null;

    @ApiProperty({example: 'Код', description: 'Код'})
    @IsOptional()
    @IsString({message: 'Поле должно быть строкой'})
    readonly full_brand_code: string | null;

    @ApiProperty({example: 'Название марки', description: 'Название марки'})
    @IsOptional()
    @IsString({message: 'Поле должно быть строкой'})
    readonly name_brand: string | null;

    @ApiProperty({example: "Заметки", description: 'Заметки'})
    @IsOptional()
    @IsString({message: 'Поле должно быть строкой'})
    readonly note: string | null;

    @ApiProperty({example: 1, description: 'ID блока'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly block_id: number;

    @ApiProperty({example: "Название кода бренда", description: 'Название кода бренда'})
    @IsOptional()
    @IsString({message: 'Поле должно быть строкой'})
    readonly full_brand_code_name: string | null;
}

