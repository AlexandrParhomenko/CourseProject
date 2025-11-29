import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsOptional, IsNumber} from "class-validator";

export class UpdateBlockDto {
    @ApiProperty({example: 1, description: 'ID контракта', required: false})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsOptional()
    readonly contract_id?: number;

    @ApiProperty({example: "БЛ-001", description: 'Обозначение блока', required: false})
    @IsString({message: 'Поле должно быть строкой'})
    @IsOptional()
    readonly designation_block?: string;

    @ApiProperty({example: "Блок управления", description: 'Название блока', required: false})
    @IsString({message: 'Поле должно быть строкой'})
    @IsOptional()
    readonly name_block?: string;

    @ApiProperty({example: "Примечание к блоку", description: 'Примечание', required: false})
    @IsString({message: 'Поле должно быть строкой'})
    @IsOptional()
    readonly note_block?: string;
}
