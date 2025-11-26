import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateOrganisationContactPersonDto} from "./dto/create-organisation-contact-person.dto";
import {UpdateOrganisationContactPersonDto} from "./dto/update-organisation-contact-person.dto";
import {OrganizationContact} from "./organisation-contact-person.model";

@Injectable()
export class OrganisationContactPersonService {

    constructor(@InjectModel(OrganizationContact) private organisationContactStorage: typeof OrganizationContact) {}

    async createOrganisationContact(dto: CreateOrganisationContactPersonDto) {
        const objectData = {
            ...dto,
            deleted: false,
            create_row_datetime: new Date()
        };
        const organisation = await this.organisationContactStorage.create(objectData);
        return await this.getOrganisationContactById(organisation.dataValues.organization_id);
    }

    async getOrganisationsContactsByContractId(contractId: number) {
        return await this.organisationContactStorage.findAll({
            where: {
                contract_id: contractId
            },
            order: [['organization_contact_person_id', 'DESC']]
        });
    }

    async getOrganisationContactById(organization_contact_person_id: number) {
        const organisation = await this.organisationContactStorage.findByPk(organization_contact_person_id);
        if (!organisation) {
            throw new NotFoundException(`Организация с ID ${organization_contact_person_id} не найдена`);
        }
        return organisation;
    }

    async updateOrganisation(id: number, dto: UpdateOrganisationContactPersonDto) {
        const organisation = await this.getOrganisationContactById(id);
        const updateData: any = {...dto};
        await organisation.update(updateData);
        return await this.getOrganisationContactById(id);
    }

    async deleteOrganisation(id: number) {
        const organisation = await this.getOrganisationContactById(id);
        await organisation.update({deleted: true});
        return await this.getOrganisationContactById(id);
    }
}

