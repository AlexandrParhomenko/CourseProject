import {Module} from '@nestjs/common';
import {RegistryController} from './registry.controller';
import {RegistryService} from './registry.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Registry} from "./registry.model";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";
import {Block} from "../blocks/block.model";
import {ObjectTable} from "../objects/object.model";

@Module({
    controllers: [RegistryController],
    providers: [RegistryService],
    imports: [
        SequelizeModule.forFeature([Registry, Contract, User, Block, ObjectTable])
    ],
    exports: [
        RegistryService,
    ]
})
export class RegistryModule {}


