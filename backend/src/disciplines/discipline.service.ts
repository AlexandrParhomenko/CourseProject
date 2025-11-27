import {Injectable, NotFoundException} from '@nestjs/common';
import {Discipline} from "./discipline.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateDisciplineDto} from "./dto/create-discipline.dto";
import {UpdateDisciplineDto} from "./dto/update-discipline.dto";
import {User} from "../users/users.model";

@Injectable()
export class DisciplineService {

    constructor(@InjectModel(Discipline) private disciplinesStorage: typeof Discipline) {}

    async createDiscipline(dto: CreateDisciplineDto) {
        const consultationData = {
            ...dto,
            create_row_datetime: new Date()
        };
        const consultation = await this.disciplinesStorage.create(consultationData);
        return await this.getDisciplineById(consultation.discipline_id);
    }

    async getDisciplines() {
        return await this.disciplinesStorage.findAll({
            where: {
                deleted: false
            }
        })
    }

    async getDisciplineById(id: number) {
        const consultation = await this.disciplinesStorage.findByPk(id, {
            include: [
                {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname']}
            ]
        });
        if (!consultation) {
            throw new NotFoundException(`Дисциплина с ID ${id} не найдена`);
        }
        return consultation;
    }

    async updateDiscipline(id: number, dto: UpdateDisciplineDto) {
        const consultation = await this.getDisciplineById(id);
        const updateData: any = {...dto};
        await consultation.update(updateData);
        return await this.getDisciplineById(id);
    }

    async deleteDiscipline(id: number) {
        const consultation = await this.getDisciplineById(id);
        await consultation.update({deleted: true});
        return await this.getDisciplineById(id);
    }
}


