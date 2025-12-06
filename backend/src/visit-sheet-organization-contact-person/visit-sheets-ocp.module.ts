import {Module} from '@nestjs/common';
import {VisitSheetsOcpController} from './visit-sheets-ocp.controller';
import {VisitSheetsOcpService} from './visit-sheets-ocp.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {VisitSheetOCP} from "./visit-sheet-ocp.model";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";
import {Specialist} from "../specialists/specialist.model";

@Module({
    controllers: [VisitSheetsOcpController],
    providers: [VisitSheetsOcpService],
    imports: [
        SequelizeModule.forFeature([VisitSheetOCP, User, Contract, Specialist])
    ],
    exports: [
        VisitSheetsOcpService,
    ]
})
export class VisitSheetsOcpModule {}

