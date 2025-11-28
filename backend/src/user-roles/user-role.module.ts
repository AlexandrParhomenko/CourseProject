import {Module} from '@nestjs/common';
import {UserRoleController} from './user-role.controller';
import {UserRoleService} from './user-role.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserRoles} from "./user-role.model";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";

@Module({
    controllers: [UserRoleController],
    providers: [UserRoleService],
    imports: [
        SequelizeModule.forFeature([UserRoles, Contract, User])
    ],
    exports: [
        UserRoleService,
    ]
})
export class UserRoleModule {}


