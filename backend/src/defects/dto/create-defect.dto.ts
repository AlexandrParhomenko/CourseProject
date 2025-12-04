import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty, IsNumber} from "class-validator";

export class CreateDefectDto {
    @ApiProperty({example: "001", description: 'Номер объекта'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly importance_defect: string;

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;
}

