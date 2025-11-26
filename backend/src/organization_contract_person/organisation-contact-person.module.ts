import {Module} from '@nestjs/common';
import {OrganisationContactPersonController} from './organisation-contact-person.controller';
import {OrganisationContactPersonService} from './organisation-contact-person.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {OrganizationContact} from "./organisation-contact-person.model";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";
import {Organization} from "../organisations/organisation.model";

@Module({
    controllers: [OrganisationContactPersonController],
    providers: [OrganisationContactPersonService],
    imports: [
        SequelizeModule.forFeature([OrganizationContact, User, Contract, Organization])
    ],
    exports: [
        OrganisationContactPersonService,
    ]
})
export class OrganisationContactPersonModule {}

