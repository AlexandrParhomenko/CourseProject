import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateDisciplineDto {
    @ApiProperty({example: "Дисциплина", description: 'Дисциплина'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly discipline: string;

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;
}

