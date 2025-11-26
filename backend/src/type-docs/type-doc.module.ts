import {Module} from '@nestjs/common';
import {TypeDocController} from './type-doc.controller';
import {TypeDocService} from './type-doc.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {TypeDocs} from "./type-doc.model";
import {User} from "../users/users.model";

@Module({
    controllers: [TypeDocController],
    providers: [TypeDocService],
    imports: [
        SequelizeModule.forFeature([TypeDocs, User])
    ],
    exports: [
        TypeDocService,
    ]
})
export class TypeDocModule {}

