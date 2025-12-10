import {Injectable, NotFoundException} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userStorage: typeof User) {}
    async createUser(dto: CreateUserDto) {
        return await this.userStorage.create(dto)
    }

    async updateUser(id: number, dto: CreateUserDto) {
        const user = await this.getUserById(id);
        if (user) {
            const updateData: any = {...dto};
            await user.update(updateData);
            return {message: "Пользователь успешно изменен!"};
        } else throw new NotFoundException(`Пользователь с ID ${id} не найден`)
    }

    async getAllUsers() {
        return await this.userStorage.findAll({include: {all: true}})
    }

    async getUserByLogin(login: string) {
        return await this.userStorage.findOne({where: {login}, include: {all: true}})
    }

    async getUserById(id: number) {
        return await this.userStorage.findOne({where: {user_id: id}, include: {all: true}})
    }
}
