import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateUserRoleDto} from "./dto/create-user-role.dto";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";

@Table({tableName: "users_roles", timestamps: false})
export class UserRoles extends Model<UserRoles, CreateUserRoleDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID связи' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'user_role_id'
    })
    user_role_id: number;

    @ApiProperty({example: 1, description: 'ID пользователя'})
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'user_id'
    })
    user_id: number;

    @ApiProperty({example: 1, description: 'ID контракта'})
    @ForeignKey(() => Contract)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'contract_id'
    })
    contract_id: number;

    @ApiProperty({example: 1, description: 'ID роли'})
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'role_id'
    })
    role_id: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата начала'})
    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'date_start'
    })
    date_start: Date;

    @ApiProperty({example: "2024-01-01", description: 'Дата окончания'})
    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'date_start'
    })
    date_end: Date;

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

