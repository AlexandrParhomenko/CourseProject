import {AutoIncrement, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {CreateUserDto} from "./dto/create-user.dto";

@Table({tableName: "users", timestamps: false})
export class User extends Model<User, CreateUserDto> {
    @ApiProperty({ example: 1, description: 'Уникальный ID пользователя' })
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'user_id'
    })
    user_id: number;

    @ApiProperty({example: "IvanovII", description: 'Логин'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @ApiProperty({example: "Иванов Иван Иванович", description: 'ФИО'})
    @Column({type: DataType.STRING, allowNull: false})
    fullname: string;

    @ApiProperty({example: "hashed_password", description: 'Хешированный пароль'})
    @Column({type: DataType.STRING, allowNull: false, field: 'hash_password'})
    hash_password: string;
}
