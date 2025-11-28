import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty, IsNumber} from "class-validator";

export class CreateTypeWorksDto {
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

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;
}

