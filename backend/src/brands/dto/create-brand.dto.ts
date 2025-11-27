import {ApiProperty} from "@nestjs/swagger";
import {IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateBrandDto {
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
    @IsString({message: 'Поле должно быть строкой'})
    readonly sections: string;

    @ApiProperty({example: 'Подсекции', description: 'Подсекции'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly subsection: string;

    @ApiProperty({example: 'Код', description: 'Код'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly full_brand_code: string;

    @ApiProperty({example: 'Название марки', description: 'Название марки'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly name_brand: string;

    @ApiProperty({example: "Заметки", description: 'Заметки'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly note: string;

    @ApiProperty({example: 1, description: 'ID блока'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly block_id: number;

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата создания записи', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsOptional()
    readonly create_row_datetime?: Date;

    @ApiProperty({example: "Название кода бренда", description: 'Название кода бренда'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly full_brand_code_name: string;
}

