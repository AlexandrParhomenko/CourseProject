import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateDefectDto} from "./dto/create-defect.dto";
import {UpdateDefectDto} from "./dto/update-defect.dto";
import {Defect} from "./defect.model";

@Injectable()
export class DefectService {

    constructor(@InjectModel(Defect) private defectStorage: typeof Defect) {}

    async createDefectPerson(dto: CreateDefectDto) {
        const objectData = {
            ...dto,
            deleted: false,
            create_row_datetime: new Date()
        };
        const defect = await this.defectStorage.create(objectData);
        return await this.getDefectById(defect.dataValues.importance_defect_id);
    }

    async getDefects() {
        return await this.defectStorage.findAll({
            where: {
                deleted: false
            }
        });
    }

    async getDefectById(importance_defect_id: number) {
        const defect = await this.defectStorage.findByPk(importance_defect_id);
        if (!defect) {
            throw new NotFoundException(`Значимость с ID ${importance_defect_id} не найдена`);
        }
        return defect;
    }

    async updateDefect(id: number, dto: UpdateDefectDto) {
        const organisation = await this.getDefectById(id);
        const updateData: any = {...dto};
        await organisation.update(updateData);
        return await this.getDefectById(id);
    }

    async deleteDefect(id: number) {
        const organisation = await this.getDefectById(id);
        await organisation.update({deleted: true});
        return await this.getDefectById(id);
    }
}

