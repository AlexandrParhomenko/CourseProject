import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateBlockDto} from "./dto/create-block.dto";
import {UpdateBlockDto} from "./dto/update-block.dto";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";
import {Block} from "./block.model";

@Injectable()
export class BlockService {

    constructor(@InjectModel(Block) private blockStorage: typeof Block) {}

    async createBlock(dto: CreateBlockDto) {
        const consultationData = {
            ...dto,
            create_row_datetime: dto.create_row_datetime || new Date()
        };
        const block = await this.blockStorage.create(consultationData);
        return await this.getBlockById(block.dataValues.block_id);
    }

    async getBlocksByContractId(contractId: number) {
        return await this.blockStorage.findAll({
            where: {
                deleted: false,
                contract_id: contractId
            },
            include: [
                {model: User, as: 'create_row_user', attributes: ['fullname']}
            ],
            order: [['block_id', 'DESC']]
        });
    }

    async getBlockById(id: number) {
        const consultation = await this.blockStorage.findByPk(id, {
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

    async updateBlock(id: number, dto: UpdateBlockDto) {
        const consultation = await this.getBlockById(id);

        const updateData: any = {...dto};
        await consultation.update(updateData);
        return await this.getBlockById(id);
    }

    async deleteBlock(id: number) {
        const consultation = await this.getBlockById(id);
        await consultation.update({deleted: true});
        return await this.getBlockById(id);
    }
}


