import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty, IsNumber} from "class-validator";

export class CreateTypeDocDto {
    @ApiProperty({example: "AOK", description: 'Тип'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly type_doc: string;

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;
}

