import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateTypeDocDto} from "./dto/create-type-doc.dto";
import {UpdateTypeDocDto} from "./dto/update-type-doc.dto";
import {TypeDocs} from "./type-doc.model";

@Injectable()
export class TypeDocService {

    constructor(@InjectModel(TypeDocs) private typeDocStorage: typeof TypeDocs) {}

    async createTypeDoc(dto: CreateTypeDocDto) {
        const typeDocData = {
            ...dto,
            deleted: false,
            create_row_datetime: new Date()
        };
        const typeDoc = await this.typeDocStorage.create(typeDocData);
        return await this.getTypeDocById(typeDoc.dataValues.type_doc_id);
    }

    async getTypeDocs() {
        return await this.typeDocStorage.findAll()
    }

    async getTypeDocById(type_doc_id: number) {
        const typeDoc = await this.typeDocStorage.findByPk(type_doc_id);
        if (!typeDoc) {
            throw new NotFoundException(`Тип с ID ${type_doc_id} не найден`);
        }
        return typeDoc;
    }

    async updateTypeDoc(id: number, dto: UpdateTypeDocDto) {
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

