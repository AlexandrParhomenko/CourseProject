import {Module} from '@nestjs/common';
import {BlocksController} from './blocks.controller';
import {BlocksService} from './blocks.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Block} from "./block.model";
import {User} from "../users/users.model";
import {Contract} from "../contracts/contract.model";

@Module({
    controllers: [BlocksController],
    providers: [BlocksService],
    imports: [
        SequelizeModule.forFeature([Block, User, Contract])
    ],
    exports: [
        BlocksService,
    ]
})
export class BlocksModule {}

