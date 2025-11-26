import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateOrganisationContactPersonDto} from "./dto/create-organisation-contact-person.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";
import {Organization} from "../organisations/organisation.model";

@Table({tableName: "organization_contact_person", timestamps: false})
export class OrganizationContact extends Model<OrganizationContact, CreateOrganisationContactPersonDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID организации' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'organization_contact_person_id'
    })
    organization_contact_person_id: number;

    @ApiProperty({example: 1, description: 'ID контракта'})
    @ForeignKey(() => Contract)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'contract_id'
    })
    contract_id: number;

    @ApiProperty({example: 1, description: 'ID организации'})
    @ForeignKey(() => Organization)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'organization_id'
    })
    organization_id: number;

    @ApiProperty({example: "Заказчик", description: 'Участники'})
    @Column({type: DataType.STRING, allowNull: false, field: 'project_participants'})
    project_participants: string;

    @ApiProperty({example: "Иванов Иван Иванович", description: 'ФИО'})
    @Column({type: DataType.STRING, allowNull: false, field: 'fullname'})
    fullname: string;

    @ApiProperty({example: "Прораб", description: 'Пост'})
    @Column({type: DataType.STRING, allowNull: false, field: 'post'})
    post: string;

    @ApiProperty({example: "ПТО", description: 'Подразделение'})
    @Column({type: DataType.STRING, allowNull: false, field: 'department'})
    department: string;

    @ApiProperty({example: "+7-999-999-99-99", description: 'Номер телефона'})
    @Column({type: DataType.STRING, allowNull: false, field: 'phone_number'})
    phone_number: string;

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

    @BelongsTo(() => Contract, {foreignKey: 'contract_id', as: 'contract'})
    contract: Contract;

    @BelongsTo(() => User, {foreignKey: 'create_row_user_id', as: 'create_row_user'})
    create_row_user: User;
}

