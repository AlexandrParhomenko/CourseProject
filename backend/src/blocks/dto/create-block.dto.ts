import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {AutoIncrement, Column, DataType, PrimaryKey} from "sequelize-typescript";

export class CreateBlockDto {
    @ApiProperty({ example: 1, description: 'Уникальный ID блока' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'block_id'
    })
    block_id: number;

    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly contract_id: number;

    @ApiProperty({example: "Обозначение блока", description: 'Обозначение блока'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly designation_block: string;

    @ApiProperty({example: "Название блока", description: 'Название блока'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly name_block: string;

    @ApiProperty({example: "Заметка", description: 'Заметка'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly note_block: string;

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата создания записи', required: false})
    @IsDateString({}, {message: 'Поле должно быть валидной датой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_datetime: Date;
}

