import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class UpdateDisciplineDto {
    @ApiProperty({example: "Дисциплина", description: 'Дисциплина'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly discipline: string;
}

