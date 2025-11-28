import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {TypeWorks} from "./type-works.model";
import {CreateTypeWorksDto} from "./dto/create-type-works.dto";
import {UpdateTypeWorksDto} from "./dto/update-type-works.dto";

@Injectable()
export class TypeWorksService {

    constructor(@InjectModel(TypeWorks) private typeWorksStorage: typeof TypeWorks) {}

    async createTypeWork(dto: CreateTypeWorksDto) {
        const typeWorkData = {
            ...dto,
            deleted: false,
            create_row_datetime: new Date()
        };
        const typeWorks = await this.typeWorksStorage.create(typeWorkData);
        return await this.getTypeDocById(typeWorks.dataValues.type_work_id);
    }

    async getTypeWork() {
        return await this.typeWorksStorage.findAll({
            where: {
                deleted: false
            }
        })
    }

    async getTypeDocById(type_doc_id: number) {
        const typeDoc = await this.typeWorksStorage.findByPk(type_doc_id);
        if (!typeDoc) {
            throw new NotFoundException(`Тип с ID ${type_doc_id} не найден`);
        }
        return typeDoc;
    }

    async updateTypeDoc(id: number, dto: UpdateTypeWorksDto) {
        const typeDoc = await this.getTypeDocById(id);
        const updateData: any = {...dto};
        await typeDoc.update(updateData);
        return await this.getTypeDocById(id);
    }

    async deleteTypeDoc(id: number) {
        const typeDoc = await this.getTypeDocById(id);
        await typeDoc.update({deleted: true});
        return await this.getTypeDocById(id);
    }
}

