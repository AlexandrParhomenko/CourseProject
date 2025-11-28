import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {CreateAbbreveBrandDto} from "./dto/create-abbreve-brand.dto";

@Table({tableName: "abbreve_brands", timestamps: false})
export class AbbreveBrand extends Model<AbbreveBrand, CreateAbbreveBrandDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID типа' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'abbreve_brand_id'
    })
    abbreve_brand_id: number;

    @ApiProperty({example: "АОК", description: 'Аббревиатура'})
    @Column({type: DataType.STRING(50), allowNull: false, field: 'abbreve_brand'})
    abbreve_brand: string;

    @ApiProperty({example: "АОК", description: 'Направление'})
    @Column({type: DataType.TEXT, allowNull: false, field: 'direction_e_violation'})
    direction_e_violation: string;

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

    @BelongsTo(() => User, {foreignKey: 'create_row_user_id', as: 'create_row_user'})
    create_row_user: User;
}

