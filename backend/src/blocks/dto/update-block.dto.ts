import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class UpdateBlockDto {
    @ApiProperty({example: "Обозначение блока", description: 'Обозначение блока'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly designation_block: string;

    @ApiProperty({example: "Название блока", description: 'Название блока'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly name_block: string;

    @ApiProperty({example: "Заметка", description: 'Заметка'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly note_block: string;
}

