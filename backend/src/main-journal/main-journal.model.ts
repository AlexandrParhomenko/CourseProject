import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateMainJournalDto} from "./dto/create-main-journal.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";
import {Brands} from "../brands/brands.model";
import {Defect} from "../defects/defect.model";
import {VisitSheet} from "../visit-sheets/visit-sheet.model";

@Table({tableName: "main_journal", timestamps: false})
export class MainJournal extends Model<MainJournal, CreateMainJournalDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID журнала' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'main_journal_id'
    })
    main_journal_id: number;

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
        field: 'date_supervision'
    })
    date_supervision: Date;

    @ApiProperty({example: 1, description: 'ID марки'})
    @ForeignKey(() => Brands)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'brand_id'
    })
    brand_id: number;

    @ApiProperty({example: "Отклонения", description: 'Отклонения'})
    @Column({type: DataType.STRING, allowNull: false, field: 'defects'})
    defects: string;

    @ApiProperty({example: "Инструкции", description: 'Инструкции'})
    @Column({type: DataType.STRING, allowNull: false, field: 'instructions'})
    instructions: string;

    @ApiProperty({example: 1, description: 'ID отклонения'})
    @ForeignKey(() => Defect)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'importance_defect_id'
    })
    importance_defect_id: number;

    @ApiProperty({example: 1, description: 'ID листа'})
    @ForeignKey(() => VisitSheet)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'visit_sheet_id'
    })
    visit_sheet_id: number;

    @ApiProperty({example: "Дедлайн", description: 'Дедлайн'})
    @Column({type: DataType.STRING, allowNull: false, field: 'deadline_eliminate'})
    deadline_eliminate: string;

    @ApiProperty({example: true, description: 'Устранено'})
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    elimination: boolean;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата устранения'})
    @Column({
        type: DataType.DATE,
        allowNull: false,
        field: 'updated_elimination_at_true'
    })
    updated_elimination_at_true: Date;

    @ApiProperty({example: "Путь", description: 'Путь'})
    @Column({type: DataType.STRING, allowNull: false, field: 'path_to_drawing'})
    path_to_drawing: string;

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


