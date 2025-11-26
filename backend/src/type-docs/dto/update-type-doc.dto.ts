import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty} from "class-validator";

export class UpdateTypeDocDto {
    @ApiProperty({example: "AOK", description: 'Тип'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly type_doc: string;
}

