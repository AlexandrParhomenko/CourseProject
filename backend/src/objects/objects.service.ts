import {Injectable, NotFoundException} from '@nestjs/common';
import {ObjectTable} from "./object.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateObjectDto} from "./dto/create-object.dto";
import {UpdateObjectDto} from "./dto/update-object.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";

@Injectable()
export class ObjectsService {

    constructor(@InjectModel(ObjectTable) private objectStorage: typeof ObjectTable) {}

    async createObject(dto: CreateObjectDto) {
        const objectData = {
            ...dto,
            create_row_datetime: dto.create_row_datetime || new Date()
        };
        const object = await this.objectStorage.create(objectData);
        return await this.getObjectById(object.dataValues.object_id);
    }

    async getObjectsByContractId(contractId: number) {
        return await this.objectStorage.findAll({
            where: {
                deleted: false,
                contract_id: contractId
            },
            include: [
                {model: Contract, as: 'contract', attributes: ['contract_id', 'number_contract']},
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ],
            order: [['object_id', 'DESC']]
        });
    }

    async getObjectById(object_id: number) {
        const object = await this.objectStorage.findByPk(object_id, {
            include: [
                {model: Contract, as: 'contract', attributes: ['contract_id', 'number_contract']},
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ]
        });
        if (!object) {
            throw new NotFoundException(`Объект с ID ${object_id} не найден`);
        }
        return object;
    }

    async updateObject(id: number, dto: UpdateObjectDto) {
        const object = await this.getObjectById(id);
        
        const updateData: any = {...dto};
        await object.update(updateData);
        return await this.getObjectById(id);
    }

    async deleteObject(id: number) {
        const object = await this.getObjectById(id);
        await object.update({deleted: true});
        return await this.getObjectById(id);
    }
}

