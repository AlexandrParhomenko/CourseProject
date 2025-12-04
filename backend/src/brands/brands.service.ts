import {Injectable, NotFoundException} from '@nestjs/common';
import {Brands} from "./brands.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateBrandDto} from "./dto/create-brand.dto";
import {UpdateBrandDto} from "./dto/update-brand.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";
import {ObjectTable} from "../objects/object.model";
import {Discipline} from "../disciplines/discipline.model";
import {Block} from "../blocks/block.model";

@Injectable()
export class BrandsService {

    constructor(@InjectModel(Brands) private brandsStorage: typeof Brands) {}

    async createBrand(dto: CreateBrandDto) {
        const consultationData = {
            ...dto,
            create_row_datetime: dto.create_row_datetime || new Date()
        };
        const consultation = await this.brandsStorage.create(consultationData);
        return await this.getBrandById(consultation.dataValues.brand_id);
    }

    async getBrandsByContractId(contractId: number) {
        const brands = await this.brandsStorage.findAll({
            where: {
                deleted: false,
                contract_id: contractId
            },
            include: [
                {model: Contract, as: 'contract', attributes: ['contract_id', 'number_contract']},
                {
                    model: ObjectTable,
                    as: 'object',
                    attributes: ['object_id', 'abbreve_name_object', 'number_object', 'full_name_object']
                },
                {model: Discipline, as: 'discipline', attributes: ['discipline_id', 'discipline']},
                {model: Block, as: 'block', attributes: ['block_id', 'designation_block']},
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ],
            order: [['brand_id', 'DESC']]
        });

        return brands.map((brand) => {
            const plain = brand.get({ plain: true }) as any;

            return {
                ...plain,
                contract_number: brand.contract?.number_contract ?? null,
                object_abbreve_name_object: brand.object?.abbreve_name_object ?? null,
                object_number_object: brand.object?.number_object ?? null,
                discipline_name: brand.discipline?.discipline ?? null,
            };
        });
    }

    async getBrandById(id: number) {
        const consultation = await this.brandsStorage.findByPk(id, {
            include: [
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ]
        });
        if (!consultation) {
            throw new NotFoundException(`Консультация с ID ${id} не найдена`);
        }
        return consultation;
    }

    async updateBrand(id: number, dto: UpdateBrandDto) {
        const consultation = await this.getBrandById(id);

        const updateData: any = {...dto};
        await consultation.update(updateData);
        return await this.getBrandById(id);
    }

    async deleteBrand(id: number) {
        const consultation = await this.getBrandById(id);
        await consultation.update({deleted: true});
        return await this.getBrandById(id);
    }
}


