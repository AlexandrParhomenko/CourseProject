import {Injectable, NotFoundException} from '@nestjs/common';
import {VisitSheet} from "./visit-sheet.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateVisitSheetDto} from "./dto/create-visit-sheet.dto";
import {UpdateVisitSheetDto} from "./dto/update-visit-sheet.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";
import {Specialist} from "../specialists/specialist.model";
import {VisitSheetOCP} from "../visit-sheet-organization-contact-person/visit-sheet-ocp.model";
import {OrganizationContact} from "../organization_contract_person/organisation-contact-person.model";

@Injectable()
export class VisitSheetsService {

    constructor(@InjectModel(VisitSheet) private visitSheetStorage: typeof VisitSheet) {
    }

    async createVisitSheet(dto: CreateVisitSheetDto) {
        const visitSheetData = {
            ...dto,
            create_row_datetime: dto.create_row_datetime || new Date()
        };
        const visitSheet = await this.visitSheetStorage.create(visitSheetData);
        return await this.getVisitSheetById(visitSheet.dataValues.visit_sheet_id);
    }

    async getVisitSheetsByContractId(contractId: number) {
        return await this.visitSheetStorage.findAll({
            where: {
                deleted: false,
                contract_id: contractId
            },
            include: [
                {model: Specialist, as: 'specialist', attributes: ['fullname']},
                {
                    model: VisitSheetOCP,
                    as: 'visit_sheet_ocps',
                    where: {deleted: false},
                    required: false,
                    attributes: ['organization_contact_person_id'],
                    include: [
                        {model: OrganizationContact, as: 'organization_contact_person', attributes: ['organization_contact_person_id', 'fullname']}
                    ]
                }
            ],
            order: [['visit_sheet_id', 'DESC']]
        });
    }

    async getVisitSheetById(id: number) {
        const visitSheet = await this.visitSheetStorage.findByPk(id, {
            include: [
                {model: Contract, as: 'contract', attributes: ['contract_id', 'number_contract']},
                {model: Specialist, as: 'specialist', attributes: ['specialist_id', 'fullname', 'post_specialist']},
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ]
        });
        if (!visitSheet) {
            throw new NotFoundException(`Лист посещений с ID ${id} не найден`);
        }
        return visitSheet;
    }

    async updateVisitSheet(id: number, dto: UpdateVisitSheetDto) {
        const visitSheet = await this.getVisitSheetById(id);

        const updateData: any = {...dto};
        await visitSheet.update(updateData);
        return await this.getVisitSheetById(id);
    }

    async deleteVisitSheet(id: number) {
        const visitSheet = await this.getVisitSheetById(id);
        await visitSheet.update({deleted: true});
        return await this.getVisitSheetById(id);
    }
}

