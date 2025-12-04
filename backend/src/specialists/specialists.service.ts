import {Injectable, NotFoundException} from '@nestjs/common';
import {Specialist} from "./specialist.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateSpecialistDto} from "./dto/create-specialist.dto";
import {UpdateSpecialistDto} from "./dto/update-specialist.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";

@Injectable()
export class SpecialistsService {

    constructor(@InjectModel(Specialist) private specialistStorage: typeof Specialist) {}

    async createSpecialist(dto: CreateSpecialistDto) {
        const specialistData = {
            ...dto,
            create_row_datetime: dto.create_row_datetime || new Date()
        };
        const specialist = await this.specialistStorage.create(specialistData);
        return await this.getSpecialistById(specialist.dataValues.specialist_id);
    }

    async getSpecialistsByContractId(contractId: number) {
        return await this.specialistStorage.findAll({
            where: {
                deleted: false,
                contract_id: contractId
            },
            include: [
                {
                    model: Contract,
                    as: 'contract',
                    attributes: ['number_contract']
                },
                {
                    model: User,
                    as: 'create_row_user',
                    attributes: ['fullname']
                }
            ],
            order: [['specialist_id', 'DESC']]
        });
    }

    async getSpecialistById(id: number) {
        const specialist = await this.specialistStorage.findByPk(id, {
            include: [
                {model: Contract, as: 'contract', attributes: ['contract_id', 'number_contract'], nested: undefined},
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname'], nested: true}
            ]
        });
        if (!specialist) {
            throw new NotFoundException(`Специалист с ID ${id} не найден`);
        }
        return specialist;
    }

    async updateSpecialist(id: number, dto: UpdateSpecialistDto) {
        const specialist = await this.getSpecialistById(id);
        
        const updateData: any = {...dto};
        await specialist.update(updateData);
        return await this.getSpecialistById(id);
    }

    async deleteSpecialist(id: number) {
        const specialist = await this.getSpecialistById(id);
        await specialist.update({ deleted: true });
        return await this.getSpecialistById(id);
    }
}


