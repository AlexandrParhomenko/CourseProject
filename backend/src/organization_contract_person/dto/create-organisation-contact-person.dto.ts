import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty, IsNumber, IsDateString} from "class-validator";

export class CreateOrganisationContactPersonDto {
    @ApiProperty({example: 1, description: 'ID контракта'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly contract_id: number;

    @ApiProperty({example: 1, description: 'ID организации'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly organization_id: number;

    @ApiProperty({example: "001", description: 'Номер объекта'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly project_participants: string;

    @ApiProperty({example: "Иванов И.И.", description: 'ФИО'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly fullname: string;

    @ApiProperty({example: "Прораб", description: 'Должность'})
    @IsString({message: 'Поле должно быть строкой'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly post: string;

    @ApiProperty({example: "ПТО", description: 'Подразделение'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly department: string;

    @ApiProperty({example: "87777777777", description: 'Номер телефона'})
    @IsString({message: 'Поле должно быть строкой'})
    readonly phone_number: string;

    @ApiProperty({example: 1, description: 'ID пользователя, создающего запись'})
    @IsNumber({}, {message: 'Поле должно быть числом'})
    @IsNotEmpty({message: 'Поле не может быть пустым'})
    readonly create_row_user_id: number;
}

