import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateOrganisationDto} from "./dto/create-organisation.dto";
import {UpdateOrganisationDto} from "./dto/update-organisation.dto";
import {Organization} from "./organisation.model";

@Injectable()
export class OrganisationService {

    constructor(@InjectModel(Organization) private organisationStorage: typeof Organization) {}

    async createOrganisation(dto: CreateOrganisationDto) {
        const objectData = {
            ...dto,
            deleted: false,
            create_row_datetime: new Date()
        };
        const organisation = await this.organisationStorage.create(objectData);
        return await this.getOrganisation(organisation.dataValues.organization_id);
    }

    async getOrganisationsByContractId(contractId: number) {
        return await this.organisationStorage.findAll({
            where: {
                contract_id: contractId
            },
            order: [['organization_id', 'DESC']]
        });
    }

    async getOrganisation(organization_id: number) {
        const organisation = await this.organisationStorage.findByPk(organization_id);
        if (!organisation) {
            throw new NotFoundException(`Организация с ID ${organization_id} не найдена`);
        }
        return organisation;
    }

    async updateOrganisation(id: number, dto: UpdateOrganisationDto) {
        const organisation = await this.getOrganisation(id);
        const updateData: any = {...dto};
        await organisation.update(updateData);
        return await this.getOrganisation(id);
    }

    async deleteOrganisation(id: number) {
        const organisation = await this.getOrganisation(id);
        await organisation.update({deleted: true});
        return await this.getOrganisation(id);
    }
}

