import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty} from "class-validator";

export class UpdateTypeWorksDto {
    @ApiProperty({example: "AOK", description: 'Категория'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly category_work: string;

    @ApiProperty({example: "AOK", description: 'Тип'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly type_work: string;

    @ApiProperty({example: "AOK", description: 'Название'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly name_work: string;
}

