import {Module} from '@nestjs/common';
import {RegisterTechnicalSolutionsController} from './register-technical-solutions.controller';
import {RegisterTechnicalSolutionsService} from './register-technical-solutions.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {TechnicalRegistry} from "./register-technical-solutions.model";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";

@Module({
    controllers: [RegisterTechnicalSolutionsController],
    providers: [RegisterTechnicalSolutionsService],
    imports: [
        SequelizeModule.forFeature([TechnicalRegistry, User, Contract])
    ],
    exports: [
        RegisterTechnicalSolutionsService,
    ]
})
export class RegisterTechnicalSolutionsModule {}


