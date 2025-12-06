import {Injectable, NotFoundException} from '@nestjs/common';
import {MainJournal} from "./main-journal.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateMainJournalDto} from "./dto/create-main-journal.dto";
import {UpdateMainJournalDto} from "./dto/update-main-journal.dto";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";
import {Defect} from "../defects/defect.model";
import {Brands} from "../brands/brands.model";
import {TypeDocs} from "../type-docs/type-doc.model";
import {Discipline} from "../disciplines/discipline.model";
import {ObjectTable} from "../objects/object.model";

@Injectable()
export class MainJournalService {

  constructor(@InjectModel(MainJournal) private mainJournalStorage: typeof MainJournal) {
  }

  async createMainJournal(dto: CreateMainJournalDto) {
    const mainJournalData = {
      ...dto,
      create_row_datetime: new Date()
    };
    const mainJournal = await this.mainJournalStorage.create(mainJournalData);
    return await this.getMainJournalById(mainJournal.dataValues.main_journal_id);
  }

  async getMainJournalsByContractId(contractId: number) {
    const journals = await this.mainJournalStorage.findAll({
      where: {
        deleted: false,
        contract_id: contractId
      },
      include: [
        {model: User, as: 'create_row_user', attributes: ['fullname']},
        {model: Defect, as: 'defect', attributes: ['importance_defect']},
        {
          model: Brands, as: 'brand', attributes: ['subsection', 'sections', 'title', "name_brand"], include: [
            {model: Discipline, as: 'discipline', attributes: ['discipline']},
            {model: ObjectTable, as: 'object', attributes: ['number_object', 'abbreve_name_object']}
          ]
        },
      ],
      order: [['main_journal_id', 'DESC']]
    });
    return journals.map(journal => {
      const plainContact = journal.get({plain: true});
      return {
        ...plainContact,
        defect: plainContact.defect?.importance_defect || null
      };
    });
  }

  async getMainJournalById(id: number) {
    const mainJournal = await this.mainJournalStorage.findByPk(id, {
      include: [
        {model: User, as: 'create_row_user', attributes: ['user_id', 'fullname'], nested: true}
      ]
    });
    if (!mainJournal) {
      throw new NotFoundException(`Специалист с ID ${id} не найден`);
    }
    return mainJournal;
  }

  async updateMainJournal(id: number, dto: UpdateMainJournalDto) {
    const mainJournal = await this.getMainJournalById(id);
    let updateData: any = {...dto};
    if (dto.elimination && !mainJournal.elimination) {
      updateData = {
        ...dto,
        updated_eliminaion_at_true: new Date()
      }
    }
    await mainJournal.update(updateData);
    return await this.getMainJournalById(id);
  }

  async deleteMainJournal(id: number) {
    const mainJournal = await this.getMainJournalById(id);
    await mainJournal.update({deleted: true});
    return await this.getMainJournalById(id);
  }
}
