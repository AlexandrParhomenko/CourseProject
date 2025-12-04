import {Injectable, NotFoundException} from '@nestjs/common';
import {TechnicalRegistry} from "./register-technical-solutions.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateRegisterTechnicalSolutionsDto} from "./dto/create-register-technical-solutions.dto";
import {UpdateRegisterTechnicalSolutionsDto} from "./dto/update-register-technical-solutions.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";

@Injectable()
export class RegisterTechnicalSolutionsService {

    constructor(@InjectModel(TechnicalRegistry) private registryStorage: typeof TechnicalRegistry) {}

    async createRegistry(dto: CreateRegisterTechnicalSolutionsDto) {
        const mainJournalData = {
            ...dto,
            create_row_datetime: new Date()
        };
        const mainJournal = await this.registryStorage.create(mainJournalData);
        return await this.getRegistryById(mainJournal.dataValues.main_journal_id);
    }

    async getRegistryByContractId(contractId: number) {
        return await this.registryStorage.findAll({
            where: {
                deleted: false,
                contract_id: contractId
            },
            include: [
                {
                    model: User,
                    as: 'create_row_user',
                    attributes: ['fullname']
                }
            ],
            order: [['main_journal_id', 'DESC']]
        });
    }

    async getRegistryById(id: number) {
        const mainJournal = await this.registryStorage.findByPk(id, {
            include: [
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname'], nested: true}
            ]
        });
        if (!mainJournal) {
            throw new NotFoundException(`Специалист с ID ${id} не найден`);
        }
        return mainJournal;
    }

    async updateRegistry(id: number, dto: UpdateRegisterTechnicalSolutionsDto) {
        const mainJournal = await this.getRegistryById(id);
        let updateData: any = {...dto};
        await mainJournal.update(updateData);
        return await this.getRegistryById(id);
    }

    async deleteRegistry(id: number) {
        const mainJournal = await this.getRegistryById(id);
        await mainJournal.update({ deleted: true });
        return await this.getRegistryById(id);
    }
}
