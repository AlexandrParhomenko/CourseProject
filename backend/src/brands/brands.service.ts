import {Injectable, NotFoundException} from '@nestjs/common';
import {Brands} from "./brands.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateBrandDto} from "./dto/create-brand.dto";
import {UpdateBrandDto} from "./dto/update-brand.dto";
import {User} from "../users/users.model";

@Injectable()
export class BrandsService {

    constructor(@InjectModel(Brands) private brandsStorage: typeof Brands) {}

    async createBrand(dto: CreateBrandDto) {
        const consultationData = {
            ...dto,
            create_row_datetime: dto.create_row_datetime || new Date()
        };
        const consultation = await this.brandsStorage.create(consultationData);
        return await this.getBrandById(consultation.brand_id);
    }

    async getBrandsByContractId(contractId: number) {
        return await this.brandsStorage.findAll({
            where: {
                deleted: false,
                contract_id: contractId
            },
            include: [
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ],
            order: [['brand_id', 'DESC']]
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


