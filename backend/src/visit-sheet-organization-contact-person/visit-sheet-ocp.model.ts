import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateVisitSheetOcpDto} from "./dto/create-visit-sheet-ocp.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";
import {Specialist} from "../specialists/specialist.model";
import {VisitSheet} from "../visit-sheets/visit-sheet.model";
import {OrganizationContact} from "../organization_contract_person/organisation-contact-person.model";

@Table({tableName: "visit_sheet_organization_contact_person", timestamps: false})
export class VisitSheetOCP extends Model<VisitSheetOCP, CreateVisitSheetOcpDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID листа посещений' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'visit_sheet_organization_contact_person_id_id'
    })
    visit_sheet_organization_contact_person_id_id: number;

    @ApiProperty({example: 1, description: 'ID листа'})
    @ForeignKey(() => VisitSheet)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'visit_sheet_id'
    })
    visit_sheet_id: number;

    @ApiProperty({example: 1, description: 'ID листа'})
    @ForeignKey(() => OrganizationContact)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'organization_contact_person_id'
    })
    organization_contact_person_id: number;

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

    @BelongsTo(() => VisitSheet, {foreignKey: 'visit_sheet_id', as: 'visit_sheet'})
    visit_sheet: VisitSheet;

    @BelongsTo(() => OrganizationContact, {foreignKey: 'organization_contact_person_id', as: 'organization_contact_person'})
    organization_contact_person: OrganizationContact;

    @BelongsTo(() => User, {foreignKey: 'create_row_user_id', as: 'create_row_user'})
    create_row_user: User;
}

