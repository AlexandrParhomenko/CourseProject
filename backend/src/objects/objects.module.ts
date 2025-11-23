import {Module} from '@nestjs/common';
import {ObjectsController} from './objects.controller';
import {ObjectsService} from './objects.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ObjectTable} from "./object.model";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";

@Module({
    controllers: [ObjectsController],
    providers: [ObjectsService],
    imports: [
        SequelizeModule.forFeature([ObjectTable, User, Contract])
    ],
    exports: [
        ObjectsService,
    ]
})
export class ObjectsModule {}

