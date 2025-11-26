import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateTypeDocDto} from "./dto/create-type-doc.dto";
import {User} from "../users/users.model";

@Table({tableName: "type_docs", timestamps: false})
export class TypeDocs extends Model<TypeDocs, CreateTypeDocDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID типа' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'type_doc_id'
    })
    type_doc_id: number;

    @ApiProperty({example: "АОК", description: 'Название типа'})
    @Column({type: DataType.STRING, allowNull: false, field: 'type_doc'})
    type_doc: string;

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

