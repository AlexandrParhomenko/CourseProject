import {Module} from '@nestjs/common';
import {BrandsController} from './brands.controller';
import {BrandsService} from './brands.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Brands} from "./brands.model";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";
import {Block} from "../blocks/block.model";
import {ObjectTable} from "../objects/object.model";

@Module({
    controllers: [BrandsController],
    providers: [BrandsService],
    imports: [
        SequelizeModule.forFeature([Brands, Contract, User, Block, ObjectTable])
    ],
    exports: [
        BrandsService,
    ]
})
export class BrandsModule {}


