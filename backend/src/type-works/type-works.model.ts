import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {CreateTypeWorksDto} from "./dto/create-type-works.dto";

@Table({tableName: "type-works", timestamps: false})
export class TypeWorks extends Model<TypeWorks, CreateTypeWorksDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID типа' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'type_work_id'
    })
    type_work_id: number;

    @ApiProperty({example: "АОК", description: 'Категория работы'})
    @Column({type: DataType.STRING, allowNull: false, field: 'category_work'})
    category_work: string;

    @ApiProperty({example: "АОК", description: 'Тип работы'})
    @Column({type: DataType.STRING, allowNull: false, field: 'type_work'})
    type_work: string;

    @ApiProperty({example: "АОК", description: 'Название работы'})
    @Column({type: DataType.STRING, allowNull: false, field: 'name_work'})
    name_work: string;

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

