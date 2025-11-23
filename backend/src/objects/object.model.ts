import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateObjectDto} from "./dto/create-object.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";

@Table({tableName: "objects", timestamps: false})
export class ObjectTable extends Model<ObjectTable, CreateObjectDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID объекта' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'object_id'
    })
    object_id: number;

    @ApiProperty({example: 1, description: 'ID контракта'})
    @ForeignKey(() => Contract)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'contract_id'
    })
    contract_id: number;

    @ApiProperty({example: "001", description: 'Номер объекта'})
    @Column({type: DataType.STRING, allowNull: false, field: 'number_object'})
    number_object: string;

    @ApiProperty({example: "ОО", description: 'Сокращенное название объекта'})
    @Column({type: DataType.STRING, allowNull: false, field: 'abbreve_name_object'})
    abbreve_name_object: string;

    @ApiProperty({example: "Объект строительства", description: 'Полное название объекта'})
    @Column({type: DataType.STRING, allowNull: false, field: 'full_name_object'})
    full_name_object: string;

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

    @BelongsTo(() => User, {foreignKey: 'create_row_user_id', as: 'createRowUser'})
    createRowUser: User;
}

