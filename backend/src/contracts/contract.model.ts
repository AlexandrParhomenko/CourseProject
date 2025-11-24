import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateContractDto} from "./dto/create-contract.dto";
import {User} from "../users/users.model";

@Table({tableName: "contract", timestamps: false})
export class Contract extends Model<Contract, CreateContractDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID контракта' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'contract_id'
    })
    contract_id: number;

    @ApiProperty({example: "123/2024", description: 'Номер контракта'})
    @Column({type: DataType.STRING, allowNull: false, field: 'number_contract'})
    number_contract: string;

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

    @ApiProperty({example: 1, description: 'ID пользователя, последним редактировавшего запись'})
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: 'last_correct_user_id'
    })
    last_correct_user_id: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата последнего редактирования'})
    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: 'last_correct_datetime'
    })
    last_correct_datetime: Date;

    @ApiProperty({example: "Иванов Иван Иванович", description: 'ФИО пользователя, последним редактировавшего запись'})
    @Column({
        type: DataType.VIRTUAL,
        get() {
            const lastCorrectUser = this.getDataValue('lastCorrectUser') as User;
            return lastCorrectUser ? lastCorrectUser.fullname : null;
        }
    })
    last_correct_columns_name: string;

    @ApiProperty({example: false, description: 'Флаг удаления'})
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    deleted: boolean;

    @ApiProperty({example: 1, description: 'ID пользователя, удалившего запись'})
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: 'deletion_user_id'
    })
    deletion_user_id: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата удаления'})
    @Column({
        type: DataType.DATE,
        allowNull: true,
        field: 'deletion_datetime'
    })
    deletion_datetime: Date;

    @BelongsTo(() => User, {foreignKey: 'create_row_user_id', as: 'create_row_user'})
    create_row_user: User;

    @BelongsTo(() => User, {foreignKey: 'last_correct_user_id', as: 'lastCorrectUser'})
    lastCorrectUser: User;

    @BelongsTo(() => User, {foreignKey: 'deletion_user_id', as: 'deletionUser'})
    deletionUser: User;
}

