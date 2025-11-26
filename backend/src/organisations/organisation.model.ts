import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateOrganisationDto} from "./dto/create-organisation.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";

@Table({tableName: "organizations", timestamps: false})
export class Organization extends Model<Organization, CreateOrganisationDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID организации' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'organization_id'
    })
    organization_id: number;

    @ApiProperty({example: "001", description: 'Название организации'})
    @Column({type: DataType.STRING, allowNull: false, field: 'organization'})
    organization: string;

    @ApiProperty({example: 1, description: 'ID пользователя, создавшего запись'})
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        field: 'create_row_user_id'
    })
    create_row_user_id: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата создания записи'})
    @Column({
        type: DataType.DATE,
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

    @ApiProperty({example: 1, description: 'ID контракта'})
    @ForeignKey(() => Contract)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'contract_id'
    })
    contract_id: number;

    @BelongsTo(() => Contract, {foreignKey: 'contract_id', as: 'contract'})
    contract: Contract;

    @BelongsTo(() => User, {foreignKey: 'create_row_user_id', as: 'create_row_user'})
    create_row_user: User;
}

