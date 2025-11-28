import {Module} from '@nestjs/common';
import {TypeWorksController} from './type-works.controller';
import {TypeWorksService} from './type-works.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {TypeWorks} from "./type-works.model";
import {User} from "../users/users.model";

@Module({
    controllers: [TypeWorksController],
    providers: [TypeWorksService],
    imports: [
        SequelizeModule.forFeature([TypeWorks, User])
    ],
    exports: [
        TypeWorksService,
    ]
})
export class TypeWorksModule {}

