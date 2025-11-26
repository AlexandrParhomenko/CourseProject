import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNumber, IsNotEmpty} from "class-validator";

export class UpdateOrganisationDto {
    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly contract_id: number;

    @ApiProperty({example: "001", description: 'Номер объекта'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly organization: string;
}

