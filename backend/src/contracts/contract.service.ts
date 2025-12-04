import {Injectable, NotFoundException} from '@nestjs/common';
import {Contract} from "./contract.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateContractDto} from "./dto/create-contract.dto";
import {UpdateContractDto} from "./dto/update-contract.dto";
import {User} from "../users/users.model";

@Injectable()
export class ContractService {

    constructor(@InjectModel(Contract) private contractStorage: typeof Contract) {}

    async createContract(dto: CreateContractDto) {
        const contractData = {
            ...dto,
            create_row_datetime: dto.create_row_datetime || new Date(),
            deleted: false
        };
        const contract = await this.contractStorage.create(contractData);
        return await this.getContractById(contract.dataValues.contract_id);
    }

    async getAllContracts() {
        return await this.contractStorage.findAll({
            where: {
              deleted: false
            },
            include: [
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']},
                {model: User, as: 'lastCorrectUser', attributes: ['user_id', 'fullname']},
                {model: User, as: 'deletionUser', attributes: ['user_id', 'fullname']}
            ],
            order: [['contract_id', 'DESC']]
        });
    }

    async getContractById(contract_id: number) {
        const contract = await this.contractStorage.findByPk(contract_id, {
            include: [
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']},
                {model: User, as: 'lastCorrectUser', attributes: ['user_id', 'fullname']},
                {model: User, as: 'deletionUser', attributes: ['user_id', 'fullname']}
            ]
        });
        if (!contract) {
            throw new NotFoundException(`Контракт с ID ${contract_id} не найден`);
        }
        return contract;
    }

    async updateContract(id: number, dto: UpdateContractDto) {
        const contract = await this.getContractById(id);
        
        const updateData: any = {...dto};
        if (dto.last_correct_user_id) {
            updateData.last_correct_datetime = dto.last_correct_datetime || new Date();
        }

        await contract.update(updateData);
        return await this.getContractById(id);
    }

    async deleteContract(id: number, deletionUserId: number) {
        const contract = await this.getContractById(id);
        
        await contract.update({
            deleted: true,
            deletion_user_id: deletionUserId,
            deletion_datetime: new Date()
        });
        
        return await this.getContractById(id);
    }
}

