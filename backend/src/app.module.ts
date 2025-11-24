import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import {Contract} from "./contracts/contract.model";
import {ObjectTable} from "./objects/object.model";
import {Specialist} from "./specialists/specialist.model";
import {VisitSheet} from "./visit-sheets/visit-sheet.model";
import {Consultation} from "./consultations/consultation.model";
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ContractModule } from './contracts/contract.module';
import { ObjectsModule } from './objects/objects.module';
import { SpecialistsModule } from './specialists/specialists.module';
import { VisitSheetsModule } from './visit-sheets/visit-sheets.module';
import { ConsultationsModule } from './consultations/consultations.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {Block} from "./blocks/block.model";
import {BlockModule} from "./blocks/block.module";
@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Contract, ObjectTable, Specialist, VisitSheet, Consultation, Block],
            autoLoadModels: true
        }),
        UsersModule,
        AuthModule,
        FilesModule,
        ContractModule,
        ObjectsModule,
        SpecialistsModule,
        VisitSheetsModule,
        ConsultationsModule,
        BlockModule
    ],
})
export class AppModule {}