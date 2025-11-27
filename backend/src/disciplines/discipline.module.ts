import {Module} from '@nestjs/common';
import {DisciplineController} from './discipline.controller';
import {DisciplineService} from './discipline.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Discipline} from "./discipline.model";
import {User} from "../users/users.model";

@Module({
    controllers: [DisciplineController],
    providers: [DisciplineService],
    imports: [
        SequelizeModule.forFeature([Discipline, User])
    ],
    exports: [
        DisciplineService,
    ]
})
export class DisciplineModule {}


