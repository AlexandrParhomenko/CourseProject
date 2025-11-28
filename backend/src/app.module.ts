import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import {Contract} from "./contracts/contract.model";
import {ObjectTable} from "./objects/object.model";
import {Specialist} from "./specialists/specialist.model";
import {VisitSheet} from "./visit-sheets/visit-sheet.model";
import {Consultation} from "./consultations/consultation.model";
import {AuthModule} from './auth/auth.module';
import {FilesModule} from './files/files.module';
import {ContractModule} from './contracts/contract.module';
import {ObjectsModule} from './objects/objects.module';
import {SpecialistsModule} from './specialists/specialists.module';
import {VisitSheetsModule} from './visit-sheets/visit-sheets.module';
import {ConsultationsModule} from './consultations/consultations.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {Block} from "./blocks/block.model";
import {BlockModule} from "./blocks/block.module";
import {OrganisationModule} from "./organisations/organisation.module";
import {Organization} from "./organisations/organisation.model";
import {OrganisationContactPersonModule} from "./organization_contract_person/organisation-contact-person.module";
import {OrganizationContact} from "./organization_contract_person/organisation-contact-person.model";
import {DefectModule} from "./defects/defect.module";
import {Defect} from "./defects/defect.model";
import {TypeDocs} from "./type-docs/type-doc.model";
import {TypeDocModule} from "./type-docs/type-doc.module";
import {Discipline} from "./disciplines/discipline.model";
import {DisciplineModule} from "./disciplines/discipline.module";
import {Brands} from "./brands/brands.model";
import {BrandsModule} from "./brands/brands.module";
import {UserRoles} from "./user-roles/user-role.model";
import {UserRoleModule} from "./user-roles/user-role.module";
import {TypeWorks} from "./type-works/type-works.model";
import {TypeWorksModule} from "./type-works/type-works.module";
import {AbbreveBrand} from "./abbreve-brand/abbreve-brand.model";
import {AbbreveBrandModule} from "./abbreve-brand/abbreve-brand.module";

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
            models: [User, Contract, ObjectTable, Specialist, VisitSheet, Consultation, Block, Organization, OrganizationContact, Defect, TypeDocs, Discipline, Brands, UserRoles, TypeWorks, AbbreveBrand],
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
        BlockModule,
        OrganisationModule,
        OrganisationContactPersonModule,
        DefectModule,
        TypeDocModule,
        DisciplineModule,
        BrandsModule,
        UserRoleModule,
        TypeWorksModule,
        AbbreveBrandModule
    ],
})
export class AppModule {
}