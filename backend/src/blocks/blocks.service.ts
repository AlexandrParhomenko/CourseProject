import {Injectable, NotFoundException} from '@nestjs/common';
import {Block} from "./block.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateBlockDto} from "./dto/create-block.dto";
import {UpdateBlockDto} from "./dto/update-block.dto";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";

@Injectable()
export class BlocksService {

    constructor(@InjectModel(Block) private blockStorage: typeof Block) {}

    async createBlock(dto: CreateBlockDto) {
        const blockData = {
            ...dto,
            create_row_datetime: dto.create_row_datetime || new Date()
        };
        const block = await this.blockStorage.create(blockData);
        return await this.getBlockById(block.block_id);
    }

    async getBlocksByContractId(contractId: number) {
        return await this.blockStorage.findAll({
            where: {
                deleted: false,
                contract_id: contractId
            },
            include: [
                {model: Contract, as: 'contract', attributes: ['contract_id', 'number_contract']},
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ],
            order: [['block_id', 'DESC']]
        });
    }

    async getBlockById(id: number) {
        const block = await this.blockStorage.findByPk(id, {
            include: [
                {model: Contract, as: 'contract', attributes: ['contract_id', 'number_contract']},
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ]
        });
        if (!block) {
            throw new NotFoundException(`Блок с ID ${id} не найден`);
        }
        return block;
    }

    async updateBlock(id: number, dto: UpdateBlockDto) {
        const block = await this.getBlockById(id);

        const updateData: any = {...dto};
        await block.update(updateData);
        return await this.getBlockById(id);
    }

    async deleteBlock(id: number) {
        const block = await this.getBlockById(id);
        await block.update({deleted: true});
        return await this.getBlockById(id);
    }
}

