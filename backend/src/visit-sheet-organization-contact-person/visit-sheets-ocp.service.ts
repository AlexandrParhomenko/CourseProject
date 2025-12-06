import {Injectable} from '@nestjs/common';
import {VisitSheetOCP} from "./visit-sheet-ocp.model";
import {InjectModel} from "@nestjs/sequelize";
import {OrganizationContact} from "../organization_contract_person/organisation-contact-person.model";

@Injectable()
export class VisitSheetsOcpService {

    constructor(@InjectModel(VisitSheetOCP) private visitSheetStorage: typeof VisitSheetOCP) {
    }
    async getVisitSheetsByListId(visitSheetId: number) {
        return await this.visitSheetStorage.findAll({
            where: {
                deleted: false,
                visit_sheet_id: visitSheetId
            },
            include: [
                {model: OrganizationContact, as: 'organization_contact_person', attributes: ['fullname']},
            ],
            order: [['visit_sheet_id', 'DESC']]
        });
    }
}

