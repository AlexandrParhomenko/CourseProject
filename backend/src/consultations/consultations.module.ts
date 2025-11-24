import {Module} from '@nestjs/common';
import {ConsultationsController} from './consultations.controller';
import {ConsultationsService} from './consultations.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Consultation} from "./consultation.model";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";

@Module({
    controllers: [ConsultationsController],
    providers: [ConsultationsService],
    imports: [
        SequelizeModule.forFeature([Consultation, Contract, User])
    ],
    exports: [
        ConsultationsService,
    ]
})
export class ConsultationsModule {}


