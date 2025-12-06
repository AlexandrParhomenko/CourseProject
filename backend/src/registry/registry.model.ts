import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateRegistryDto} from "./dto/create-registry.dto";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";
import {TypeDocs} from "../type-docs/type-doc.model";
import {Brands} from "../brands/brands.model";

@Table({tableName: "registry", timestamps: false})
export class Registry extends Model<Registry, CreateRegistryDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID реестра' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'registry_id'
    })
    registry_id: number;

    @ApiProperty({example: 1, description: 'ID контракта'})
    @ForeignKey(() => Contract)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'contract_id'
    })
    contract_id: number;

    @ApiProperty({example: 1, description: 'ID марки'})
    @ForeignKey(() => Registry)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'brand_id'
    })
    brand_id: number;

    @ApiProperty({example: "Тип", description: 'Тип работы'})
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: 'type_work'
    })
    type_work: string;

    @ApiProperty({example: 1, description: 'ID типа документа'})
    @ForeignKey(() => TypeDocs)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'type_doc_id'
    })
    type_doc_id: number;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата отзыва'})
    @Column({
        type: DataType.DATE,
        field: 'date_of_review'
    })
    date_of_review: Date;

    @ApiProperty({example: "2024-01-01T00:00:00", description: 'Дата подписания'})
    @Column({
        type: DataType.DATE,
        field: 'date_signing_doc'
    })
    date_signing_doc: Date;

    @ApiProperty({example: "Путь", description: 'Путь к подписанному документу'})
    @Column({
        type: DataType.TEXT,
        field: 'path_to_doc_signed'
    })
    path_to_doc_signed: string;

    @ApiProperty({example: "Путь", description: 'Путь к заметкам'})
    @Column({
        type: DataType.TEXT,
        field: 'path_to_doc_with_note'
    })
    path_to_doc_with_note: string;

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

    @BelongsTo(() => TypeDocs, {foreignKey: 'type_doc_id', as: 'type_doc'})
    type_doc: TypeDocs;

    @BelongsTo(() => Brands, {foreignKey: 'brand_id', as: 'brand'})
    brand: Brands;

    @BelongsTo(() => User, {foreignKey: 'create_row_user_id', as: 'create_row_user'})
    create_row_user: User;
}

