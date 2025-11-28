import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {AbbreveBrand} from "./abbreve-brand.model";


@Injectable()
export class AbbreveBrandService {

    constructor(@InjectModel(AbbreveBrand) private abbreveBrandStorage: typeof AbbreveBrand) {}

    async getAbbreve() {
        return await this.abbreveBrandStorage.findAll({
            where: {
                deleted: false
            },
            order: [['abbreve_brand_id', 'DESC']]
        })
    }
}

