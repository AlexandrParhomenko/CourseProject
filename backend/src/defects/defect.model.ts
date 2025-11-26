import {AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateDefectDto} from "./dto/create-defect.dto";
import {User} from "../users/users.model";

@Table({tableName: "importance_defects", timestamps: false})
export class Defect extends Model<Defect, CreateDefectDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID значимости' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'importance_defect_id'
    })
    importance_defect_id: number;

    @ApiProperty({example: "Значительный дефект", description: 'Значимость'})
    @Column({type: DataType.STRING, allowNull: false, field: 'importance_defect'})
    importance_defect: string;

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

