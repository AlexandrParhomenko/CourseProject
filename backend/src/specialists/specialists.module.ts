import {Module} from '@nestjs/common';
import {SpecialistsController} from './specialists.controller';
import {SpecialistsService} from './specialists.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Specialist} from "./specialist.model";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";

@Module({
    controllers: [SpecialistsController],
    providers: [SpecialistsService],
    imports: [
        SequelizeModule.forFeature([Specialist, User, Contract])
    ],
    exports: [
        SpecialistsService,
    ]
})
export class SpecialistsModule {}


