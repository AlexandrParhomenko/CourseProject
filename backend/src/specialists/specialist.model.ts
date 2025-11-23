import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateSpecialistDto} from "./dto/create-specialist.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";

@Table({tableName: "specialists", timestamps: false})
export class Specialist extends Model<Specialist, CreateSpecialistDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID специалиста' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'specialist_id'
    })
    specialist_id: number;

    @ApiProperty({example: 1, description: 'ID контракта'})
    @ForeignKey(() => Contract)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'contract_id'
    })
    contract_id: number;

    @ApiProperty({example: "Иванов Иван Иванович", description: 'ФИО специалиста'})
    @Column({type: DataType.STRING, allowNull: false})
    fullname: string;

    @ApiProperty({example: "Инженер", description: 'Должность специалиста'})
    @Column({type: DataType.STRING, allowNull: false, field: 'post_specialist'})
    post_specialist: string;

    @ApiProperty({example: "+7 (999) 123-45-67", description: 'Номер телефона'})
    @Column({type: DataType.STRING, allowNull: false, field: 'phone_number'})
    phone_number: string;

    @ApiProperty({example: 12345, description: 'Номер документа'})
    @Column({type: DataType.INTEGER, allowNull: false, field: 'number_doc'})
    number_doc: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата документа'})
    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'date_doc'
    })
    date_doc: Date;

    @ApiProperty({example: 1, description: 'ID пользователя, создавшего запись'})
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'create_row_user_id'
    })
    create_row_user_id: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата создания записи'})
    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'create_row_datetime'
    })
    create_row_datetime: Date;

    @ApiProperty({example: false, description: 'Флаг удаления'})
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    deleted: boolean;

    @ApiProperty({example: "Общестроительные работы", description: 'Типы работ'})
    @Column({
        type: DataType.STRING,
        allowNull: true,
        field: 'type_work',
        defaultValue: "Общестроительные работы"
    })
    type_work: string;

    @BelongsTo(() => Contract, {foreignKey: 'contract_id', as: 'contract'})
    contract: Contract;

    @BelongsTo(() => User, {foreignKey: 'create_row_user_id', as: 'createRowUser'})
    createRowUser: User;
}


