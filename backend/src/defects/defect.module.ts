import {Module} from '@nestjs/common';
import {DefectController} from './defect.controller';
import {DefectService} from './defect.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Defect} from "./defect.model";
import {User} from "../users/users.model";

@Module({
    controllers: [DefectController],
    providers: [DefectService],
    imports: [
        SequelizeModule.forFeature([Defect, User])
    ],
    exports: [
        DefectService,
    ]
})
export class DefectModule {}

