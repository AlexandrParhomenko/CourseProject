import {Module} from '@nestjs/common';
import {BlockController} from './block.controller';
import {BlockService} from './block.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Contract} from "../contracts/contract.model";
import {User} from "../users/users.model";
import {Block} from "./block.model";

@Module({
    controllers: [BlockController],
    providers: [BlockService],
    imports: [
        SequelizeModule.forFeature([Block, Contract, User])
    ],
    exports: [
        BlockService,
    ]
})
export class BlockModule {}


