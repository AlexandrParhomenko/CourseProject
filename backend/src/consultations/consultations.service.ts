import {Injectable, NotFoundException} from '@nestjs/common';
import {Consultation} from "./consultation.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateConsultationDto} from "./dto/create-consultation.dto";
import {UpdateConsultationDto} from "./dto/update-consultation.dto";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";

@Injectable()
export class ConsultationsService {

    constructor(@InjectModel(Consultation) private consultationStorage: typeof Consultation) {}

    async createConsultation(dto: CreateConsultationDto) {
        const consultationData = {
            ...dto,
            create_row_datetime: dto.create_row_datetime || new Date()
        };
        const consultation = await this.consultationStorage.create(consultationData);
        return await this.getConsultationById(consultation.consultation_id);
    }

    async getConsultationsByContractId(contractId: number) {
        return await this.consultationStorage.findAll({
            where: {
                contract_id: contractId
            },
            include: [
                {model: Contract, as: 'contract', attributes: ['contract_id', 'number_contract']},
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ],
            order: [['consultation_id', 'DESC']]
        });
    }

    async getConsultationById(id: number) {
        const consultation = await this.consultationStorage.findByPk(id, {
            include: [
                {model: Contract, as: 'contract', attributes: ['contract_id', 'number_contract']},
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ]
        });
        if (!consultation) {
            throw new NotFoundException(`Консультация с ID ${id} не найдена`);
        }
        return consultation;
    }

    async updateConsultation(id: number, dto: UpdateConsultationDto) {
        const consultation = await this.getConsultationById(id);

        const updateData: any = {...dto};
        await consultation.update(updateData);
        return await this.getConsultationById(id);
    }

    async deleteConsultation(id: number) {
        const consultation = await this.getConsultationById(id);
        await consultation.update({deleted: true});
        return await this.getConsultationById(id);
    }
}


