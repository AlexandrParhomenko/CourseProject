import {Module} from '@nestjs/common';
import {MainJournalController} from './main-journal.controller';
import {MainJournalService} from './main-journal.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {MainJournal} from "./main-journal.model";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";

@Module({
    controllers: [MainJournalController],
    providers: [MainJournalService],
    imports: [
        SequelizeModule.forFeature([MainJournal, User, Contract])
    ],
    exports: [
        MainJournalService,
    ]
})
export class MainJournalModule {}


