import {Module} from '@nestjs/common';
import {OrganisationController} from './organisation.controller';
import {OrganisationService} from './organisation.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Organization} from "./organisation.model";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";

@Module({
    controllers: [OrganisationController],
    providers: [OrganisationService],
    imports: [
        SequelizeModule.forFeature([Organization, User, Contract])
    ],
    exports: [
        OrganisationService,
    ]
})
export class OrganisationModule {}

