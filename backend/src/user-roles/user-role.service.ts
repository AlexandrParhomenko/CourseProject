import {Injectable, NotFoundException} from '@nestjs/common';
import {UserRoles} from "./user-role.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserRoleDto} from "./dto/create-user-role.dto";
import {UpdateUserRoleDto} from "./dto/update-user-role.dto";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";

@Injectable()
export class UserRoleService {

    constructor(@InjectModel(UserRoles) private userRoleStorage: typeof UserRoles) {}

    async createUserRole(dto: CreateUserRoleDto) {
        const userRoleData = {
            ...dto,
            create_row_datetime: new Date()
        };
        const user_role = await this.userRoleStorage.create(userRoleData);
        return await this.getUserRoleById(user_role.user_role_id);
    }

    async getUserRoleByUserId(userId: number) {
        return await this.userRoleStorage.findAll({
            where: {
                deleted: false,
                user_id: userId
            },
            include: [
                {model: Contract, as: 'contract', attributes: ['number_contract']},
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ],
            order: [['user_role_id', 'DESC']]
        });
    }

    async getUserRoleById(id: number) {
        const user_role = await this.userRoleStorage.findByPk(id, {
            include: [
                {model: Contract, as: 'contract', attributes: ['contract_id', 'number_contract']},
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ]
        });
        if (!user_role) {
            throw new NotFoundException(`Роль с ID ${id} не найдена`);
        }
        return user_role;
    }

    async updateUserRole(id: number, dto: UpdateUserRoleDto) {
        const consultation = await this.getUserRoleById(id);

        const updateData: any = {...dto};
        await consultation.update(updateData);
        return await this.getUserRoleById(id);
    }

    async deleteUserRole(id: number) {
        const consultation = await this.getUserRoleById(id);
        await consultation.update({deleted: true});
        return await this.getUserRoleById(id);
    }
}


