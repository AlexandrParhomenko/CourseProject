import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateConsultationDto} from "./dto/create-consultation.dto";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";

@Table({tableName: "consultations", timestamps: false})
export class Consultation extends Model<Consultation, CreateConsultationDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID консультации' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'consultation_id'
    })
    consultation_id: number;

    @ApiProperty({example: 1, description: 'ID контракта'})
    @ForeignKey(() => Contract)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'contract_id'
    })
    contract_id: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата консультации'})
    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'date_cons'
    })
    date_cons: Date;

    @ApiProperty({example: "Обсуждение этапов проекта", description: 'Содержание консультации'})
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: 'content_cons'
    })
    content_cons: string;

    @ApiProperty({example: "Согласован план действий", description: 'Результат консультации'})
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: 'result_cons'
    })
    result_cons: string;

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

    @BelongsTo(() => Contract, {foreignKey: 'contract_id', as: 'contract'})
    contract: Contract;

    @BelongsTo(() => User, {foreignKey: 'create_row_user_id', as: 'create_row_user'})
    create_row_user: User;
}

