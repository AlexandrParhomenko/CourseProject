import {Injectable, NotFoundException} from '@nestjs/common';
import {Registry} from "./registry.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateRegistryDto} from "./dto/create-registry.dto";
import {UpdateRegistryDto} from "./dto/update-registry.dto";
import {User} from "../users/users.model";

@Injectable()
export class RegistryService {

    constructor(@InjectModel(Registry) private registryStorage: typeof Registry) {}

    async createRegistry(dto: CreateRegistryDto) {
        const consultationData = {
            ...dto,
            create_row_datetime: new Date()
        };
        const consultation = await this.registryStorage.create(consultationData);
        return await this.getBrandById(consultation.brand_id);
    }

    async getRegistryByContractId(contractId: number) {
        return await this.registryStorage.findAll({
            where: {
                deleted: false,
                contract_id: contractId
            },
            include: [
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ],
            order: [['brand_id', 'DESC']]
        });
    }

    async getBrandById(id: number) {
        const registry = await this.registryStorage.findByPk(id, {
            include: [
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ]
        });
        if (!registry) {
            throw new NotFoundException(`Реестр с ID ${id} не найдена`);
        }
        return registry;
    }

    async updateRegistry(id: number, dto: UpdateRegistryDto) {
        const consultation = await this.getBrandById(id);

        const updateData: any = {...dto};
        await consultation.update(updateData);
        return await this.getBrandById(id);
    }

    async deleteRegistry(id: number) {
        const consultation = await this.getBrandById(id);
        await consultation.update({deleted: true});
        return await this.getBrandById(id);
    }
}


