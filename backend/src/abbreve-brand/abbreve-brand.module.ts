import {Module} from '@nestjs/common';
import {AbbreveBrandController} from './abbreve-brand.controller';
import {AbbreveBrandService} from './abbreve-brand.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {AbbreveBrand} from "./abbreve-brand.model";
import {User} from "../users/users.model";

@Module({
    controllers: [AbbreveBrandController],
    providers: [AbbreveBrandService],
    imports: [
        SequelizeModule.forFeature([AbbreveBrand, User])
    ],
    exports: [
        AbbreveBrandService,
    ]
})
export class AbbreveBrandModule {}

