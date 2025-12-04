import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty} from "class-validator";

export class UpdateDefectDto {
    @ApiProperty({example: "001", description: 'Номер объекта'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly importance_defect: string;
}

