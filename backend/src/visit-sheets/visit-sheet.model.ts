import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateVisitSheetDto} from "./dto/create-visit-sheet.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";
import {Specialist} from "../specialists/specialist.model";
import {VisitSheetOCP} from "../visit-sheet-organization-contact-person/visit-sheet-ocp.model";

@Table({tableName: "visit_sheet", timestamps: false})
export class VisitSheet extends Model<VisitSheet, CreateVisitSheetDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID листа посещений' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'visit_sheet_id'
    })
    visit_sheet_id: number;

    @ApiProperty({example: 1, description: 'ID контракта'})
    @ForeignKey(() => Contract)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'contract_id'
    })
    contract_id: number;

    @ApiProperty({example: 1, description: 'ID специалиста'})
    @ForeignKey(() => Specialist)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'specialist_id'
    })
    specialist_id: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата прибытия'})
    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'date_arrival'
    })
    date_arrival: Date;

    @ApiProperty({example: "2024-01-10", description: 'Дата отъезда'})
    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'date_departure'
    })
    date_departure: Date;

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

    @BelongsTo(() => Specialist, {foreignKey: 'specialist_id', as: 'specialist'})
    specialist: Specialist;

    @BelongsTo(() => User, {foreignKey: 'create_row_user_id', as: 'create_row_user'})
    create_row_user: User;

    @HasMany(() => VisitSheetOCP, {foreignKey: 'visit_sheet_id', as: 'visit_sheet_ocps'})
    visit_sheet_ocps: VisitSheetOCP[];
}

