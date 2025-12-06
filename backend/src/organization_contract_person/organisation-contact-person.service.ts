import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateOrganisationContactPersonDto} from "./dto/create-organisation-contact-person.dto";
import {UpdateOrganisationContactPersonDto} from "./dto/update-organisation-contact-person.dto";
import {OrganizationContact} from "./organisation-contact-person.model";
import {User} from "../users/users.model";
import {Organization} from "../organisations/organisation.model";

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
        const contacts =  await this.organisationContactStorage.findAll({
            where: {
                deleted: false,
                contract_id: contractId
            },
            include: [
                {model: Organization, as: 'organization', attributes: ["organization"]},
            ],
            order: [['organization_contact_person_id', 'DESC']]
        });
        return contacts.map(contact => {
            const plainContact = contact.get({ plain: true });
            return {
                ...plainContact,
                organization: plainContact.organization?.organization || null
            };
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

