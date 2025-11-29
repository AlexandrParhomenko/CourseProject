import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateRegisterTechnicalSolutionsDto} from "./dto/create-register-technical-solutions.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";
import {Brands} from "../brands/brands.model";
import {Defect} from "../defects/defect.model";
import {VisitSheet} from "../visit-sheets/visit-sheet.model";
import {MainJournal} from "../main-journal/main-journal.model";

@Table({tableName: "registry_technical_solutions", timestamps: false})
export class TechnicalRegistry extends Model<TechnicalRegistry, CreateRegisterTechnicalSolutionsDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID реестра' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'registry_technical_solution_id'
    })
    registry_technical_solution_id: number;

    @ApiProperty({example: 1, description: 'ID контракта'})
    @ForeignKey(() => Contract)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'contract_id'
    })
    contract_id: number;

    @ApiProperty({example: "2024-01-01", description: 'Дата'})
    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'date_solution'
    })
    date_solution: Date;

    @ApiProperty({example: 1, description: 'ID журнала'})
    @ForeignKey(() => MainJournal)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'main_journal_id'
    })
    main_journal_id: number;

    @ApiProperty({example: "Код", description: 'Код марки'})
    @Column({type: DataType.STRING, allowNull: false, field: 'full_brand_code'})
    full_brand_code: string;

    @ApiProperty({example: "Причина", description: 'Причина'})
    @Column({type: DataType.STRING, allowNull: false, field: 'reason_change'})
    reason_change: string;

    @ApiProperty({example: "Путь", description: 'Путь к фото результата'})
    @Column({type: DataType.STRING, allowNull: false, field: 'path_photo_sol'})
    path_photo_sol: string;

    @ApiProperty({example: "Статус", description: 'Статус'})
    @Column({type: DataType.STRING, allowNull: false, field: 'status_compliance'})
    status_compliance: string;

    @ApiProperty({example: "Заметки", description: 'Заметки'})
    @Column({type: DataType.CHAR, allowNull: false, field: 'note'})
    note: string;

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


