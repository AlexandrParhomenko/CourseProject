import {Injectable, NotFoundException} from '@nestjs/common';
import {Registry} from "./registry.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateRegistryDto} from "./dto/create-registry.dto";
import {UpdateRegistryDto} from "./dto/update-registry.dto";
import {User} from "../users/users.model";
import {Brands} from "../brands/brands.model";
import {TypeDocs} from "../type-docs/type-doc.model";

@Injectable()
export class RegistryService {

    constructor(@InjectModel(Registry) private registryStorage: typeof Registry) {}

    async createRegistry(dto: CreateRegistryDto) {
        const consultationData = {
            ...dto,
            create_row_datetime: new Date()
        };
        const registry = await this.registryStorage.create(consultationData);
        return await this.getRegistryById(registry.dataValues.registry_id);
    }

    async getRegistryByContractId(contractId: number) {
        const registries =  await this.registryStorage.findAll({
            where: {
                deleted: false,
                contract_id: contractId
            },
            include: [
                {model: User, as: 'create_row_user', attributes: ['fullname']},
                {model: Brands, as: 'brand', attributes: ['name_brand']},
                {model: TypeDocs, as: 'type_doc', attributes: ['type_doc']}
            ],
            order: [['registry_id', 'DESC']]
        });
        return registries.map(contact => {
            const plainRegistry = contact.get({ plain: true });
            return {
                ...plainRegistry,
                brand: plainRegistry.brand?.name_brand || null,
                create_row_user: plainRegistry.create_row_user?.fullname || null,
                type_doc: plainRegistry.type_doc?.type_doc || null
            };
        });
    }

    async getRegistryById(id: number) {
        const registry = await this.registryStorage.findByPk(id, {
            include: [
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ]
        });
        if (!registry) {
            throw new NotFoundException(`Реестр с ID ${id} не найден`);
        }
        return registry;
    }

    async updateRegistry(id: number, dto: UpdateRegistryDto) {
        const consultation = await this.getRegistryById(id);

        const updateData: any = {...dto};
        await consultation.update(updateData);
        return await this.getRegistryById(id);
    }

    async deleteRegistry(id: number) {
        const consultation = await this.getRegistryById(id);
        await consultation.update({deleted: true});
        return await this.getRegistryById(id);
    }
}


