import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateBrandDto} from "./dto/create-brand.dto";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";
import {ObjectTable} from "../objects/object.model";
import {Discipline} from "../disciplines/discipline.model";
import {Block} from "../blocks/block.model";

@Table({tableName: "brands", timestamps: false})
export class Brands extends Model<Brands, CreateBrandDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID марки' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'brand_id'
    })
    brand_id: number;

    @ApiProperty({example: 1, description: 'ID контракта'})
    @ForeignKey(() => Contract)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'contract_id'
    })
    contract_id: number;

    @ApiProperty({example: 1, description: 'ID объекта'})
    @ForeignKey(() => ObjectTable)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'object_id'
    })
    object_id: number;

    @ApiProperty({example: "Название марки", description: 'Название марки'})
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: 'title'
    })
    title: string;

    @ApiProperty({example: 1, description: 'ID дисциплины'})
    @ForeignKey(() => Discipline)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'discipline_id'
    })
    discipline_id: number;

    @ApiProperty({example: 1, description: 'ID сокращенного бренда'})
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: 'abbreve_brand_id'
    })
    abbreve_brand_id: number;

    @ApiProperty({example: "Секция", description: 'Секция'})
    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: 'sections'
    })
    sections: string;

    @ApiProperty({example: "Подсекция", description: 'Подсекция'})
    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        field: 'subsection'
    })
    subsection: string;

    @ApiProperty({example: "Код", description: 'Код марки'})
    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: 'full_brand_code'
    })
    full_brand_code: string;

    @ApiProperty({example: "Название", description: 'Название марки'})
    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: 'name_brand'
    })
    name_brand: string;

    @ApiProperty({example: "Заметки", description: 'Заметки'})
    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: 'note'
    })
    note: string;

    @ApiProperty({example: 1, description: 'ID блока'})
    @ForeignKey(() => Block)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        field: 'block_id'
    })
    block_id: number;

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

    @ApiProperty({example: "Название кода бренда", description: 'Название кода бренда'})
    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: 'full_brand_code_name'
    })
    full_brand_code_name: string;

    @BelongsTo(() => Contract, {foreignKey: 'contract_id', as: 'contract'})
    contract: Contract;

    @BelongsTo(() => User, {foreignKey: 'create_row_user_id', as: 'create_row_user'})
    create_row_user: User;
}

