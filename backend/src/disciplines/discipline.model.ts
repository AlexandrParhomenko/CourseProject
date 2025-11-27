import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateDisciplineDto} from "./dto/create-discipline.dto";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";

@Table({tableName: "disciplines", timestamps: false})
export class Discipline extends Model<Discipline, CreateDisciplineDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID дисциплины' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'discipline_id'
    })
    discipline_id: number;

    @ApiProperty({example: "Дисциплина", description: 'Дисциплина'})
    @Column({
        type: DataType.TEXT,
        allowNull: false,
        field: 'discipline'
    })
    discipline: string;

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

    @BelongsTo(() => User, {foreignKey: 'create_row_user_id', as: 'create_row_user'})
    create_row_user: User;
}

