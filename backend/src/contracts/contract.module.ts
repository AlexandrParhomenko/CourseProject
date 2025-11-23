import {Module} from '@nestjs/common';
import {ContractController} from './contract.controller';
import {ContractService} from './contract.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Contract} from "./contract.model";
import {User} from "../users/users.model";

@Module({
    controllers: [ContractController],
    providers: [ContractService],
    imports: [
        SequelizeModule.forFeature([Contract, User])
    ],
    exports: [
        ContractService,
    ]
})
export class ContractModule {}

