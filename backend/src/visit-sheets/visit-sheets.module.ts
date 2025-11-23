import {Module} from '@nestjs/common';
import {VisitSheetsController} from './visit-sheets.controller';
import {VisitSheetsService} from './visit-sheets.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {VisitSheet} from "./visit-sheet.model";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";
import {Specialist} from "../specialists/specialist.model";

@Module({
    controllers: [VisitSheetsController],
    providers: [VisitSheetsService],
    imports: [
        SequelizeModule.forFeature([VisitSheet, User, Contract, Specialist])
    ],
    exports: [
        VisitSheetsService,
    ]
})
export class VisitSheetsModule {}

